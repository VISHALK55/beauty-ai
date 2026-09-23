package com.beautyai.salon.util;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.Base64;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final String bucketName;
    private final Pattern base64Pattern = Pattern.compile("^data:(image/[a-zA-Z]*);base64,(.*)$");

    public S3Service() {
        this.s3Client = S3Client.create();
        this.bucketName = System.getenv("MEDIA_BUCKET");
    }

    /**
     * Decodes a base64 data URI and uploads it to S3.
     * @param base64DataUri e.g., "data:image/jpeg;base64,/9j/4AAQSk..."
     * @param folder prefix for the S3 object key (e.g., "salons/heena-makeover/gallery")
     * @return Public S3 URL of the uploaded image, or null if invalid
     */
    public String uploadBase64Image(String base64DataUri, String folder) {
        if (base64DataUri == null || base64DataUri.trim().isEmpty() || bucketName == null) {
            return null;
        }

        // If it's already a URL (e.g. from fallback or previous upload), just return it
        if (base64DataUri.startsWith("http")) {
            return base64DataUri;
        }

        Matcher matcher = base64Pattern.matcher(base64DataUri);
        if (!matcher.matches()) {
            System.err.println("Invalid Base64 Data URI format");
            return null;
        }

        String mimeType = matcher.group(1);
        String base64String = matcher.group(2);
        
        String extension = mimeType.split("/")[1];
        if (extension.equals("jpeg")) extension = "jpg";
        
        String fileName = folder + "/" + UUID.randomUUID().toString() + "." + extension;
        byte[] imageBytes = Base64.getDecoder().decode(base64String);

        try {
            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(mimeType)
                    .build();

            s3Client.putObject(putOb, RequestBody.fromBytes(imageBytes));

            // Return the S3 object URL
            return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;

        } catch (Exception e) {
            System.err.println("Failed to upload image to S3: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
