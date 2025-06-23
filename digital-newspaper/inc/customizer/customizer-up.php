<?php
/**
 * Handles the customizer additional functionality.
 */
if( !function_exists( 'digital_newspaper_customizer_up_panel' ) ) :
    /**
     * Register controls for upsell, notifications and addtional info.
     * 
     */
    function digital_newspaper_customizer_up_panel( $wp_customize ) {
        // upgrade info box
        $wp_customize->add_setting( 'social_icons_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'social_icons_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Social Icons Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'social_icons_section',
                'priority'  => 200,
                'settings'    => 'social_icons_upgrade_info',
                'features'  =>  [
                    esc_html__( 'Add as many social icons as you want', 'digital-newspaper' )
                ]
            ))
        );

        // Preloader pre sale
        $wp_customize->add_setting( 'preloader_upgrade_info', [
            'sanitize_callback' => 'sanitize_text_field'
        ]);
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'preloader_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Preloader Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'preloader_section',
                'features'  =>  [
                    esc_html__( '20+ Preloader', 'digital-newspaper' )
                ]
            ))
        );

        // Website style pre sale
        $wp_customize->add_setting( 'website_style_upgrade_info', [
            'sanitize_callback' => 'sanitize_text_field'
        ]);
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'website_style_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Website Styles Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'website_styles_section',
                'features'  =>  [
                    esc_html__( 'Enable Website Frame', 'digital-newspaper' ),
                    esc_html__( 'Frame Width & Color', 'digital-newspaper' ),
                    esc_html__( 'Border Width & Box Shadow', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'website_layouts_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'website_layouts_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Website Layout Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'website_layout_section',
                'features'  =>  [
                    esc_html__( '6 title layouts', 'digital-newspaper' ),
                    esc_html__( '3 search popup layouts', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'animation_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'animation_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Animation Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'animation_section',
                'settings'    => 'animation_upgrade_info',
                'features'  =>  [
                    esc_html__( 'Site Wow Animation', 'digital-newspaper' ),
                    esc_html__( '10 post title hover effects', 'digital-newspaper' ),
                    esc_html__( '10 image hover effects', 'digital-newspaper' ),
                    esc_html__( 'Post blocks hover effects', 'digital-newspaper' ),
                    esc_html__( '2 cursor animation', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'global_buttons_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'global_buttons_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Global Button Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'buttons_section',
                'features'  =>  [
                    esc_html__( 'Font Size', 'digital-newspaper' ),
                    esc_html__( 'Border', 'digital-newspaper' ),
                    esc_html__( 'Padding', 'digital-newspaper' )
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'sidebars_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'sidebars_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Sidebar Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'sidebar_options_section',
                'settings'    => 'sidebars_upgrade_info',
                'priority'    => 1,
                'features'  =>  [
                    esc_html__( 'Left and right both sidebar layout', 'digital-newspaper' )
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'breadcrumb_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'breadcrumb_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Breadcrumb Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'breadcrumb_options_section',
                'features'  =>  [
                    esc_html__( 'Display Breadcrumb On', 'digital-newspaper' ),
                    esc_html__( 'Text & Link Color', 'digital-newspaper' ),
                    esc_html__( 'Background', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'stt_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'stt_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Breadcrumb Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'stt_options_section',
                'settings'    => 'stt_upgrade_info',
                'features'  =>  [
                    esc_html__( 'Button Label', 'digital-newspaper' ),
                    esc_html__( 'Font Size', 'digital-newspaper' ),
                    esc_html__( 'Button Align', 'digital-newspaper' ),
                    esc_html__( 'Border', 'digital-newspaper' ),
                    esc_html__( 'Border Hover', 'digital-newspaper' ),
                    esc_html__( 'Padding', 'digital-newspaper' ),
                    esc_html__( 'Icon Text Color', 'digital-newspaper' ),
                    esc_html__( 'Background', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'typography_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'typography_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Typography Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'typography_section',
                'features'  =>  [
                    esc_html__( 'More than 1500+ google fonts', 'digital-newspaper' )
                ]
            ))
        );

        // top header pre sale
        $wp_customize->add_setting( 'top_header_section_pre_sales', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'top_header_section_pre_sales', array(
                'label'	      => esc_html__( 'Need More Top Header Options ?', 'digital-newspaper' ),
                'section'     => 'digital_newspaper_top_header_section',
                'features'  =>  [
                    esc_html__( 'Ticker Number of posts to display', 'digital-newspaper' ),
                    esc_html__( 'Ticker auto slide', 'digital-newspaper' ),
                    esc_html__( 'Ticker slide horizontal direction', 'digital-newspaper' ),
                    esc_html__( 'Border Bottom', 'digital-newspaper' ),
                    esc_html__( 'Date / Time Color', 'digital-newspaper' ),
                    esc_html__( 'Menu & Social Icon Color', 'digital-newspaper' ),
                    esc_html__( 'Ticker Text & Arrows Color', 'digital-newspaper' )
                ],
                'priority'  =>  200
            ))
        );

        // Ads banner pre sale
        $wp_customize->add_setting( 'ads_banner_section_pre_sales', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'ads_banner_section_pre_sales', array(
                'label'	      => esc_html__( 'Need More Ads Banner Options ?', 'digital-newspaper' ),
                'section'     => 'digital_newspaper_header_ads_banner_section',
                'features'  =>  [
                    esc_html__( 'Shortcode', 'digital-newspaper' ),
                    esc_html__( 'Ads Banner Sidebar', 'digital-newspaper' )
                ],
                'priority'  =>  200
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'theme_header_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'theme_header_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Main Header Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'main_header_section',
                'priority'  => 100,
                'features'  =>  [
                    esc_html__( '3 header layouts', 'digital-newspaper' ),
                    esc_html__( 'Sidebar Appear From', 'digital-newspaper' ),
                    esc_html__( 'Header Sticky on Scroll Down', 'digital-newspaper' ),
                    esc_html__( 'Toggle Bar Color', 'digital-newspaper' ),
                    esc_html__( 'Sidebar Background', 'digital-newspaper' ),
                    esc_html__( 'Search Icon Color', 'digital-newspaper' ),
                    esc_html__( 'Show header box shadow', 'digital-newspaper' ),
                    esc_html__( 'More than 1500+ Google Fonts', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'single_post_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'single_post_upgrade_info', array(
                'label'	      => esc_html__( 'More Features', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'single_post_section',
                'settings'    => 'single_post_upgrade_info',
                'priority'  => 100,
                'features' => [
                    esc_html__( 'Elements Re-Order', 'digital-newspaper' ),
                    esc_html__( 'Meta Re-Order', 'digital-newspaper' ),
                    esc_html__( '2 Related News Layouts', 'digital-newspaper' ),
                    esc_html__( 'Related News Filter By', 'digital-newspaper' ),
                    esc_html__( 'Number of Related Posts', 'digital-newspaper' ),
                    esc_html__( 'Show Featured Image', 'digital-newspaper' ),
                    esc_html__( 'Show Related Posts on Popup Box', 'digital-newspaper' ),
                    esc_html__( 'Related Posts Meta Re-Order', 'digital-newspaper' ),
                    esc_html__( 'More than 1500+ Google Fonts', 'digital-newspaper' ),
                ]
            ))
        );

        // newsletter pre sale
        $wp_customize->add_setting( 'header_newsletter_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'header_newsletter_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Newsletter Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'header_newsletter_section',
                'settings'    => 'header_newsletter_upgrade_info',
                'priority'  => 100,
                'features' => [
                    esc_html__( 'Button Label', 'digital-newspaper' ),
                    esc_html__( 'Button Content Display As', 'digital-newspaper' ),
                    esc_html__( 'Open in New / Same Tab', 'digital-newspaper' ),
                    esc_html__( 'Label color', 'digital-newspaper' )
                ]
            ))
        );

        // random news pre sale
        $wp_customize->add_setting( 'random_news_pre_sales', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'random_news_pre_sales', array(
                'label'	      => esc_html__( 'Need More Random Options ?', 'digital-newspaper' ),
                'section'     => 'digital_newspaper_header_random_news_section',
                'settings'    => 'random_news_pre_sales',
                'priority'  => 100,
                'features' => [
                    esc_html__( 'Button Label', 'digital-newspaper' ),
                    esc_html__( 'Open in New / Same Tab', 'digital-newspaper' ),
                    esc_html__( 'Label color', 'digital-newspaper' )
                ]
            ))
        );

        // Menu options pre sale
        $wp_customize->add_setting( 'menu_options_section_pre_sales', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'menu_options_section_pre_sales', array(
                'label'	      => esc_html__( 'Need More Menu Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'header_menu_option_section',
                'priority'  => 200,
                'features' => [
                    esc_html__( 'Main Menu Text & Active Color', 'digital-newspaper' ),
                    esc_html__( 'Sub Menu Text & Background Color', 'digital-newspaper' ),
                    esc_html__( 'Mobile Menu Toggle Color', 'digital-newspaper' ),
                    esc_html__( 'Border Top & Bottom', 'digital-newspaper' ),
                    esc_html__( 'More than 1500+ Google Fonts', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'header_live_search_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'header_live_search_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Live Search Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'header_live_search_section',
                'priority'  => 100,
                'features' => [
                    esc_html__( 'Show Post Thumbnail, Title & Date', 'digital-newspaper' ),
                    esc_html__( 'Number of Posts to Display', 'digital-newspaper' ),
                    esc_html__( 'Show View All Button', 'digital-newspaper' ),
                    esc_html__( 'Button Label', 'digital-newspaper' ),
                    esc_html__( 'Open in New / Same Tab', 'digital-newspaper' )
                ]
            ))
        );

        // Ticker News Pre sales
        $wp_customize->add_setting( 'ticker_news_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'ticker_news_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Live Search Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'ticker_news_section',
                'priority'  => 1,
                'features' => [
                    esc_html__( '3 Ticker Layouts', 'digital-newspaper' ),
                    esc_html__( 'Show Post Thumbnail Image', 'digital-newspaper' ),
                    esc_html__( 'Offset', 'digital-newspaper' ),
                    esc_html__( 'Show Ticker Controllers', 'digital-newspaper' ),
                    esc_html__( 'Slider Speed', 'digital-newspaper' )
                ]
            ))
        );

        // main banner pre sales
        $wp_customize->add_setting( 'main_banner_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'main_banner_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Live Search Options ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'main_banner_section',
                'settings'    => 'main_banner_upgrade_info',
                'priority'  => 1000,
                'features' => [
                    esc_html__( '6 Banner Layouts', 'digital-newspaper' ),
                    esc_html__( 'Show Post Category, Date & Author', 'digital-newspaper' ),
                    esc_html__( 'Excerpt Length', 'digital-newspaper' ),
                    esc_html__( 'Slider Settings', 'digital-newspaper' ),
                    esc_html__( 'Content Background', 'digital-newspaper' ),
                    esc_html__( 'Column Re-Order', 'digital-newspaper' ),
                    esc_html__( 'Layout One Tab Re-Order', 'digital-newspaper' ),
                    esc_html__( 'And Meny More', 'digital-newspaper' ),
                    esc_html__( 'More than 1500+ Google Fonts', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'full_width_section_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'full_width_section_upgrade_info', array(
                'label'	      => esc_html__( 'More sections and news blocks', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'full_width_section',
                'settings'    => 'full_width_section_upgrade_info',
                'priority'  => 20,
                'features' => [
                    esc_html__( 'Unlimited Sections', 'digital-newspaper' ),
                    esc_html__( 'Content & Section Background', 'digital-newspaper' ),
                    esc_html__( 'Margin & Padding', 'digital-newspaper' ),
                    esc_html__( 'Video Playlist', 'digital-newspaper' ),
                    esc_html__( '2 Column Section', 'digital-newspaper' ),
                    esc_html__( '3 Column Section', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'leftc_rights_section_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'leftc_rights_section_upgrade_info', array(
                'label'	      => esc_html__( 'More sections and news blocks', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'leftc_rights_section',
                'settings'    => 'leftc_rights_section_upgrade_info',
                'priority'  => 20,
                'features' => [
                    esc_html__( 'Unlimited Sections', 'digital-newspaper' ),
                    esc_html__( 'Content & Section Background', 'digital-newspaper' ),
                    esc_html__( 'Margin & Padding', 'digital-newspaper' ),
                    esc_html__( 'Video Playlist', 'digital-newspaper' ),
                    esc_html__( '2 Column Section', 'digital-newspaper' ),
                    esc_html__( '3 Column Section', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'lefts_rightc_section_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'lefts_rightc_section_upgrade_info', array(
                'label'	      => esc_html__( 'More sections and news blocks', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'lefts_rightc_section',
                'settings'    => 'lefts_rightc_section_upgrade_info',
                'priority'  => 20,
                'features' => [
                    esc_html__( 'Unlimited Sections', 'digital-newspaper' ),
                    esc_html__( 'Content & Section Background', 'digital-newspaper' ),
                    esc_html__( 'Margin & Padding', 'digital-newspaper' ),
                    esc_html__( 'Video Playlist', 'digital-newspaper' ),
                    esc_html__( '2 Column Section', 'digital-newspaper' ),
                    esc_html__( '3 Column Section', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'bottom_full_width_section_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'bottom_full_width_section_upgrade_info', array(
                'label'	      => esc_html__( 'More sections and news blocks', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'bottom_full_width_section',
                'settings'    => 'bottom_full_width_section_upgrade_info',
                'priority'  => 20,
                'features' => [
                    esc_html__( 'Unlimited Sections', 'digital-newspaper' ),
                    esc_html__( 'Content & Section Background', 'digital-newspaper' ),
                    esc_html__( 'Margin & Padding', 'digital-newspaper' ),
                    esc_html__( 'Video Playlist', 'digital-newspaper' ),
                    esc_html__( '2 Column Section', 'digital-newspaper' ),
                    esc_html__( '3 Column Section', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'footer_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'footer_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Theme Footer Features ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'footer_section',
                'settings'    => 'footer_upgrade_info',
                'priority'  => 100,
                'features'  =>  [
                    esc_html__( 'Border Top', 'digital-newspaper' ),
                    esc_html__( 'Text Color', 'digital-newspaper' ),
                    esc_html__( 'Widget Background', 'digital-newspaper' ),
                    esc_html__( 'Background', 'digital-newspaper' )
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'bottom_footer_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'bottom_footer_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Bottom Footer Features ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'bottom_footer_section',
                'settings'    => 'bottom_footer_upgrade_info',
                'priority'  => 100,
                'features'  =>  [
                    esc_html__( 'WYSIWYG Editor', 'digital-newspaper' ),
                    esc_html__( 'Copyright Align', 'digital-newspaper' ),
                    esc_html__( 'Text & Link color', 'digital-newspaper' ),
                    esc_html__( 'Background', 'digital-newspaper' )
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'blog_archive_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'blog_archive_upgrade_info', array(
                'label'	      => esc_html__( 'Need More Archive Features ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'blog_archive_section',
                'settings'    => 'blog_archive_upgrade_info',
                'priority'  => 100,
                'features' => [
                    esc_html__( '6 Archive Layouts', 'digital-newspaper' ),
                    esc_html__( 'Show Archive Title Prefix', 'digital-newspaper' ),
                    esc_html__( 'Show Archive Categories', 'digital-newspaper' ),
                    esc_html__( 'Excerpt Length', 'digital-newspaper' ),
                    esc_html__( 'Elements Re-Order', 'digital-newspaper' ),
                    esc_html__( 'Meta Re-Order', 'digital-newspaper' ),
                    esc_html__( 'Padding & Content Background', 'digital-newspaper' ),
                    esc_html__( 'More than 1500+ Google Fonts', 'digital-newspaper' )
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( '404_section_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, '404_section_upgrade_info', array(
                'label'	      => esc_html__( 'Need More 404 Features ?', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . '404_section',
                'settings'    => '404_section_upgrade_info',
                'priority'  => 100,
                'features' => [
                    esc_html__( '404 Page Ttile', 'digital-newspaper' ),
                    esc_html__( '404 Content Ttile', 'digital-newspaper' ),
                    esc_html__( 'Button Text & Url', 'digital-newspaper' ),
                    esc_html__( 'Content Background', 'digital-newspaper' ),
                ]
            ))
        );

        // upgrade info box
        $wp_customize->add_setting( 'search_page_section_upgrade_info', array(
            'sanitize_callback' => 'sanitize_text_field'
        ));
        $wp_customize->add_control( 
            new Digital_Newspaper_WP_Upsell_Control( $wp_customize, 'search_page_section_upgrade_info', array(
                'label'	      => esc_html__( 'More Features', 'digital-newspaper' ),
                'section'     => DIGITAL_NEWSPAPER_PREFIX . 'search_page_section',
                'settings'    => 'search_page_section_upgrade_info',
                'priority'  => 100,
                'features' => [
                    esc_html__( 'Prefix Ttile', 'digital-newspaper' ),
                    esc_html__( 'No Result Ttile', 'digital-newspaper' ),
                    esc_html__( 'No Result Content', 'digital-newspaper' ),
                    esc_html__( 'Content Background', 'digital-newspaper' ),
                ]
            ))
        );
    }
    add_action( 'customize_register', 'digital_newspaper_customizer_up_panel', 20 );
endif;