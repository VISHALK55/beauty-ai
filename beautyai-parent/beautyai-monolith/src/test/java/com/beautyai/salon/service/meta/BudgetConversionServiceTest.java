package com.beautyai.salon.service.meta;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class BudgetConversionServiceTest {

    private final BudgetConversionService service = new BudgetConversionService();

    @Test
    public void testConvertToMetaCurrency() {
        assertEquals(10000L, service.convertToMetaCurrency(100.0));
        assertEquals(30000L, service.convertToMetaCurrency(300.0));
        assertEquals(99900L, service.convertToMetaCurrency(999.0));
        assertEquals(100000L, service.convertToMetaCurrency(1000.0));
        assertEquals(25050L, service.convertToMetaCurrency(250.50));
    }

    @Test
    public void testInvalidBudget() {
        assertThrows(IllegalArgumentException.class, () -> service.convertToMetaCurrency(0));
        assertThrows(IllegalArgumentException.class, () -> service.convertToMetaCurrency(-50));
    }
}
