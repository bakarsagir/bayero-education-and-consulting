<?php
/*
Plugin Name: University Database Integration
Description: Integrates with the University Database API
Version: 1.0
Author: Your Name
*/

// Add settings page to WordPress admin
function university_database_settings_page() {
    add_options_page(
        'University Database Settings',
        'University Database',
        'manage_options',
        'university-database-settings',
        'university_database_settings_page_html'
    );
}
add_action('admin_menu', 'university_database_settings_page');

// Settings page HTML
function university_database_settings_page_html() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    if (isset($_POST['api_url'])) {
        update_option('university_database_api_url', sanitize_text_field($_POST['api_url']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $api_url = get_option('university_database_api_url', 'http://localhost:3001');
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form method="post">
            <table class="form-table">
                <tr>
                    <th scope="row">API URL</th>
                    <td>
                        <input type="url" name="api_url" value="<?php echo esc_attr($api_url); ?>" class="regular-text">
                        <p class="description">Enter the URL of your University Database API</p>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save Settings'); ?>
        </form>
    </div>
    <?php
}

// Enhanced shortcode with more options
function university_database_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'type' => 'universities',
        'limit' => 10,
        'page' => 1,
        'country' => '',
        'level' => '',
        'view' => 'grid' // grid or list
    ), $atts);

    $api_url = get_option('university_database_api_url', 'http://localhost:3001');
    $endpoint = "/api/{$attributes['type']}";
    
    // Build query parameters
    $query_params = array_filter([
        'limit' => $attributes['limit'],
        'page' => $attributes['page'],
        'country' => $attributes['country'],
        'level' => $attributes['level']
    ]);
    
    $url = add_query_arg($query_params, $api_url . $endpoint);
    
    $response = wp_remote_get($url);
    
    if (is_wp_error($response)) {
        return '<div class="error">Error fetching data from API</div>';
    }
    
    $data = json_decode(wp_remote_retrieve_body($response), true);
    
    if (!isset($data['data'])) {
        return '<div class="error">Invalid data received from API</div>';
    }

    // Add CSS for the grid/list view
    wp_enqueue_style('university-database-styles', plugins_url('css/styles.css', __FILE__));
    
    ob_start();
    ?>
    <div class="university-database <?php echo esc_attr($attributes['view']); ?>-view">
        <?php foreach ($data['data'] as $item): ?>
            <div class="university-item">
                <h3><?php echo esc_html($item['name']); ?></h3>
                <?php if (!empty($item['country'])): ?>
                    <p class="country">Country: <?php echo esc_html($item['country']); ?></p>
                <?php endif; ?>
                <?php if (!empty($item['website'])): ?>
                    <a href="<?php echo esc_url($item['website']); ?>" target="_blank" class="website-link">Visit Website</a>
                <?php endif; ?>
                <?php if (!empty($item['description'])): ?>
                    <p class="description"><?php echo esc_html($item['description']); ?></p>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
        
        <?php if ($data['totalPages'] > 1): ?>
            <div class="pagination">
                <?php for ($i = 1; $i <= $data['totalPages']; $i++): ?>
                    <a href="<?php echo add_query_arg('page', $i); ?>" 
                       class="page-number <?php echo $i == $data['page'] ? 'current' : ''; ?>">
                        <?php echo $i; ?>
                    </a>
                <?php endfor; ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('university_database', 'university_database_shortcode');

// Add CSS file
function university_database_styles() {
    wp_enqueue_style(
        'university-database-styles',
        plugins_url('css/styles.css', __FILE__)
    );
}
add_action('wp_enqueue_scripts', 'university_database_styles');