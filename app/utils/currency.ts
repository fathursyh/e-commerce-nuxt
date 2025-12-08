export function formatCurrency(number: number): string {
    return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3, style: "currency", currency: "USD" }).format(
        number,
    );
}