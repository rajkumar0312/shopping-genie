import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/comparison_result.dart';

class SearchService {
  // Android emulator -> host machine. Change for a physical phone.
  static const String baseUrl = 'http://10.0.2.2:8081';

  Future<List<ComparisonResult>> search(
    String query, {
    String? pincode,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/search'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'query': query,
        if (pincode != null && pincode.trim().isNotEmpty)
          'pincode': pincode.trim(),
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Search failed: ${response.statusCode}');
    }

    final body = jsonDecode(response.body) as Map<String, dynamic>;
    final rows = body['results'] as List<dynamic>;

    return rows
        .map((item) => ComparisonResult.fromJson(item as Map<String, dynamic>))
        .toList();
  }
}
