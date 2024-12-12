export class Formatter {
  static currency(value: number, decimal = 2): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimal }).format(value)
  }
}