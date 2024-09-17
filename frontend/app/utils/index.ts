export const formatCurrency = (value: string) => {
    if (value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(value));
    }
};