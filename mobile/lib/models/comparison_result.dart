class ComparisonResult {
  final String platform;
  final String productTitle;
  final double? price;
  final double? mrp;
  final String availability;
  final String? deliveryText;
  final String productUrl;

  ComparisonResult({
    required this.platform,
    required this.productTitle,
    required this.price,
    required this.mrp,
    required this.availability,
    required this.deliveryText,
    required this.productUrl,
  });

  factory ComparisonResult.fromJson(Map<String, dynamic> json) {
    return ComparisonResult(
      platform: json['platform'] as String,
      productTitle: json['productTitle'] as String,
      price: (json['price'] as num?)?.toDouble(),
      mrp: (json['mrp'] as num?)?.toDouble(),
      availability: json['availability'] as String,
      deliveryText: json['deliveryText'] as String?,
      productUrl: json['productUrl'] as String,
    );
  }
}
