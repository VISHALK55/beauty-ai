package com.beautyai.salon.util;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EncryptionUtilTest {

    private final EncryptionUtil encryptionUtil = new EncryptionUtil("A1B2C3D4E5F60718293A4B5C6D7E8F90");

    @Test
    public void testEncryptDecrypt() {
        String originalText = "EAAabc123xyzSecretToken";
        String encrypted = encryptionUtil.encrypt(originalText);
        
        assertNotNull(encrypted);
        assertNotEquals(originalText, encrypted);
        
        String decrypted = encryptionUtil.decrypt(encrypted);
        assertEquals(originalText, decrypted);
    }
}
