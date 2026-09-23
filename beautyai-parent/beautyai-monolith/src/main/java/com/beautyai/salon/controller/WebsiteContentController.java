package com.beautyai.salon.controller;

import com.beautyai.salon.model.GalleryImage;
import com.beautyai.salon.model.BlogPost;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class WebsiteContentController {

    private final DynamoDbEnhancedClient enhancedClient;
    private final S3Presigner s3Presigner;
    private final String tableName = System.getenv("TABLE_NAME");
    private final String bucketName = System.getenv("MEDIA_BUCKET");

    public WebsiteContentController(DynamoDbEnhancedClient enhancedClient) {
        this.enhancedClient = enhancedClient;
        this.s3Presigner = S3Presigner.create();
    }

    @GetMapping("/upload-url")
    public UploadUrlResponse getUploadUrl(@RequestParam String fileName, @RequestParam String contentType) {
        String objectKey = "uploads/" + UUID.randomUUID() + "-" + fileName;
        
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(15))
                .putObjectRequest(objectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);
        
        return new UploadUrlResponse(presignedRequest.url().toString(), objectKey);
    }

    @GetMapping("/salons/{salonId}/gallery")
    public List<GalleryImage> getGallery(@PathVariable String salonId) {
        DynamoDbTable<GalleryImage> table = enhancedClient.table(tableName, TableSchema.fromBean(GalleryImage.class));
        QueryConditional query = QueryConditional.sortBeginsWith(
                Key.builder().partitionValue("SALON#" + salonId).sortValue("GALLERY#").build());
        return table.query(query).items().stream().collect(Collectors.toList());
    }

    @PostMapping("/salons/{salonId}/gallery")
    public GalleryImage addGalleryImage(@PathVariable String salonId, @RequestBody GalleryImage image) {
        DynamoDbTable<GalleryImage> table = enhancedClient.table(tableName, TableSchema.fromBean(GalleryImage.class));
        image.setPk("SALON#" + salonId);
        String id = UUID.randomUUID().toString();
        image.setSk("GALLERY#" + id);
        image.setId(id);
        table.putItem(image);
        return image;
    }

    @GetMapping("/salons/{salonId}/blogs")
    public List<BlogPost> getBlogs(@PathVariable String salonId) {
        DynamoDbTable<BlogPost> table = enhancedClient.table(tableName, TableSchema.fromBean(BlogPost.class));
        QueryConditional query = QueryConditional.sortBeginsWith(
                Key.builder().partitionValue("SALON#" + salonId).sortValue("BLOG#").build());
        return table.query(query).items().stream().collect(Collectors.toList());
    }

    @PostMapping("/salons/{salonId}/blogs")
    public BlogPost addBlog(@PathVariable String salonId, @RequestBody BlogPost post) {
        DynamoDbTable<BlogPost> table = enhancedClient.table(tableName, TableSchema.fromBean(BlogPost.class));
        post.setPk("SALON#" + salonId);
        String id = UUID.randomUUID().toString();
        post.setSk("BLOG#" + id);
        post.setId(id);
        table.putItem(post);
        return post;
    }

    static class UploadUrlResponse {
        public String uploadUrl;
        public String objectKey;
        public UploadUrlResponse(String uploadUrl, String objectKey) {
            this.uploadUrl = uploadUrl;
            this.objectKey = objectKey;
        }
    }
}
