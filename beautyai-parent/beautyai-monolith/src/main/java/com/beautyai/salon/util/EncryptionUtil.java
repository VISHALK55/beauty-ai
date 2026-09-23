package com.beautyai.salon.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class EncryptionUtil {

    private static final String ALGORITHM = "AES";

    private final SecretKeySpec secretKey;

    public EncryptionUtil(@Value("${meta.ads.encryption-secret}") String secret) {
        // Ensure secret is 16, 24, or 32 bytes for AES
        byte[] keyBytes = new byte[32];
        byte[] providedBytes = secret.getBytes(StandardCharsets.UTF_8);
        System.arraycopy(providedBytes, 0, keyBytes, 0, Math.min(providedBytes.length, keyBytes.length));
        this.secretKey = new SecretKeySpec(keyBytes, ALGORITHM);
    }

    public String encrypt(String rawValue) {
        if (rawValue == null) return null;
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(rawValue.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting token", e);
        }
    }

    public String decrypt(String encryptedValue) {
        if (encryptedValue == null) return null;
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedValue));
            return new String(decryptedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting token", e);
        }
    }
}
