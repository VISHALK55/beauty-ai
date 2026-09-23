package com.beautyai.salon.service.meta;

import org.springframework.stereotype.Service;

@Service
public class BudgetConversionService {

    /**
     * Converts a user-facing daily budget (e.g., rupees) to the Meta API equivalent (e.g., paise).
     * Meta requires the budget to be an integer representing the smallest currency unit.
     * For INR, USD, EUR, etc., this is usually a multiplier of 100.
     *
     * @param budgetInMajorUnit the budget (e.g., 300 rupees)
     * @return the budget in the smallest currency unit (e.g., 30000 paise)
     */
    public long convertToMetaCurrency(double budgetInMajorUnit) {
        if (budgetInMajorUnit <= 0) {
            throw new IllegalArgumentException("Budget must be greater than 0");
        }
        return Math.round(budgetInMajorUnit * 100.0);
    }
}
