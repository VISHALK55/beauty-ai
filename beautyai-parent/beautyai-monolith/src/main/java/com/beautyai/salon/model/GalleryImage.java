package com.beautyai.salon.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public class GalleryImage {
    private String pk;
    private String sk;
    private String id;
    private String src;
    private String title;
    
    @DynamoDbPartitionKey
    public String getPk() { return pk; }
    public void setPk(String pk) { this.pk = pk; }
    
    @DynamoDbSortKey
    public String getSk() { return sk; }
    public void setSk(String sk) { this.sk = sk; }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getSrc() { return src; }
    public void setSrc(String src) { this.src = src; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
