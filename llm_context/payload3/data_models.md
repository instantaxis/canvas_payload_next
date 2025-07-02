# Payload 3.0 Data Models and Relationships

This document outlines the data models and their relationships within the Payload CMS, designed for a restaurant or similar business management system. It highlights key fields, relationships, and notes on Payload 3.0 features, including the Lexical WYSIWYG editor.

## Collections Overview

### 1. `Users`
*   **Slug**: `users`
*   **Purpose**: Manages user accounts, authentication, and authorization.
*   **Key Fields**: `email` (default), `first_name`, `last_name`, `phone`, `employee_id`, `roles` (select, hasMany), `status` (select), `locations` (relationship to `locations`, hasMany), `primary_location` (relationship to `locations`), `employment_details` (group), `profile_photo` (relationship to `media`), `jobs` (relationship to `jobs`, hasMany).
*   **Relationships**:
    *   One-to-many with `Locations` (via `locations` and `primary_location`)
    *   One-to-many with `Jobs` (via `jobs`)
    *   One-to-one with `Media` (via `profile_photo`)
*   **Payload 3.0 Notes**: Leverages Payload's built-in authentication (`auth: true`). The `roles` field is critical for Role-Based Access Control (RBAC).

### 2. `Media`
*   **Slug**: `media`
*   **Purpose**: Handles file uploads (images, PDFs, videos).
*   **Key Fields**: `alt` (text), `caption` (textarea), `uploadedBy` (relationship to `users`).
*   **Configuration**: `upload: true` enables media capabilities. `imageSizes` are defined for responsive image handling.
*   **Relationships**:
    *   Many-to-one with `Users` (via `uploadedBy`)
*   **Payload 3.0 Notes**: The `upload` property is a core feature for managing assets.

### 3. `Contacts`
*   **Slug**: `contacts`
*   **Purpose**: Stores contact information for various entities (customers, vendors, contractors).
*   **Key Fields**: `first_name`, `last_name`, `email`, `phone`, `company`, `contact_type`, `toast_id`, `brevo_id`, `vip_id`, `visit_frequency`, `last_visit`, `total_visits`, `average_spend`, `notes`, `marketing_consent`, `birthday`, `anniversary`.
*   **Relationships**:
    *   Many-to-many with `Locations` (via `associated_locations`)
    *   Many-to-many with `Messages` (via `associated_messages`)
    *   Many-to-one with `Locations` (via `preferred_location`)
*   **Payload 3.0 Notes**: Demonstrates `beforeChange` and `afterChange` hooks for custom logic (e.g., auto-generating `vip_id`).

### 4. `DietaryRestrictions`
*   **Slug**: `dietary-restrictions`
*   **Purpose**: Manages common dietary restrictions and allergies.
*   **Key Fields**: `name`, `description`.
*   **Relationships**: Expected to be related to `MenuItems` (not explicitly defined in provided files).

### 5. `DrinkMenuItems`
*   **Slug**: `drinkMenuItems`
*   **Purpose**: Stores information about drink menu items.
*   **Key Fields**: `name`, `description`, `price`, `category` (relationship to `drinkSubcategories`), `active`.
*   **Relationships**:
    *   Many-to-one with `DrinkSubcategories` (via `category`)

### 6. `DrinkSubcategories`
*   **Slug**: `drinkSubcategories`
*   **Purpose**: Defines categories for drink menu items.
*   **Key Fields**: `name`.
*   **Relationships**:
    *   One-to-many with `DrinkMenuItems`

### 7. `EmployeeRatings`
*   **Slug**: `employee-ratings`
*   **Purpose**: Tracks employee performance ratings.
*   **Key Fields**: `employee_id` (relationship to `users`), `location_id` (relationship to `locations`), `data_date`, `rating`, `manager_report_id` (relationship to `managerReports`), `employee_notes` (richText), `internal_notes` (textarea).
*   **Relationships**:
    *   Many-to-one with `Users` (via `employee_id`)
    *   Many-to-one with `Locations` (via `location_id`)
    *   Many-to-one with `ManagerReports` (via `manager_report_id`)
*   **Payload 3.0 Notes**: Uses `richText` field type, powered by the Lexical WYSIWYG editor.

### 8. `Features`
*   **Slug**: `features`
*   **Purpose**: Manages feature flags for the application.
*   **Key Fields**: `name`, `enabled`.

### 9. `HotspotLogins`
*   **Slug**: `hotspot-logins`
*   **Purpose**: Stores WiFi hotspot login data and customer information.
*   **Key Fields**: `location` (relationship to `locations`), `customer_name`, `customer_email`, `marketing_consent`.
*   **Relationships**:
    *   Many-to-one with `Locations` (via `location`)

### 10. `Incidents`
*   **Slug**: `incidents`
*   **Purpose**: Records incidents or issues.
*   **Key Fields**: `title`, `description`, `date`, `location` (relationship to `locations`), `reportedBy` (relationship to `users`), `status`.
*   **Relationships**:
    *   Many-to-one with `Locations` (via `location`)
    *   Many-to-one with `Users` (via `reportedBy`)

### 11. `Jobs`
*   **Slug**: `jobs`
*   **Purpose**: Defines job roles or positions.
*   **Key Fields**: `name`.
*   **Relationships**:
    *   One-to-many with `Users`

### 12. `Locations`
*   **Slug**: `locations`
*   **Purpose**: Manages physical locations of the business.
*   **Key Fields**: `name`, `address`, `city`, `state`, `zip`, `phone`, `email`.
*   **Relationships**:
    *   One-to-many with `Users`, `Contacts`, `HotspotLogins`, `Incidents`, `ManagerReports`, `QrFeedback`, `Reviews`, `ServerReports`, `Upgrades`, `Questions`.

### 13. `ManagerReports`
*   **Slug**: `managerReports`
*   **Purpose**: Stores daily or shift manager reports.
*   **Key Fields**: `title`, `date`, `manager` (relationship to `users`), `location` (relationship to `locations`), `notes`.
*   **Relationships**:
    *   Many-to-one with `Users` (via `manager`)
    *   Many-to-one with `Locations` (via `location`)
    *   One-to-many with `EmployeeRatings`

### 14. `MessageTypes`
*   **Slug**: `message-types`
*   **Purpose**: Defines categories for customer messages.
*   **Key Fields**: `name`.
*   **Relationships**:
    *   One-to-many with `Messages`

### 15. `Messages`
*   **Slug**: `messages`
*   **Purpose**: Manages customer messages and inquiries.
*   **Key Fields**: `status`, `priority`, `subject`, `from_name`, `from_email`, `from_phone`, `location` (relationship to `locations`), `message_type` (relationship to `message-types`), `message` (richText), `internal_notes` (richText), `assigned_to` (relationship to `users`), `response_sent`, `response_date`, `attachments` (relationship to `media`, hasMany).
*   **Relationships**:
    *   Many-to-one with `Locations` (via `location`)
    *   Many-to-one with `MessageTypes` (via `message_type`)
    *   Many-to-one with `Users` (via `assigned_to`)
    *   Many-to-many with `Media` (via `attachments`)
*   **Payload 3.0 Notes**: Uses `richText` fields for `message` and `internal_notes`, leveraging the Lexical WYSIWYG editor.

### 16. `QrFeedback`
*   **Slug**: `qrFeedback`
*   **Purpose**: Collects feedback via QR codes.
*   **Key Fields**: `rating`, `comment`, `location` (relationship to `locations`), `user` (relationship to `users`).
*   **Relationships**:
    *   Many-to-one with `Locations` (via `location`)
    *   Many-to-one with `Users` (via `user`)

### 17. `Questions`
*   **Slug**: `questions`
*   **Purpose**: Manages custom questions for reports.
*   **Key Fields**: `status`, `sort`, `question`, `shift_timing`, `shift_selection` (hasMany), `min_characters`, `locations` (relationship to `locations`, hasMany).
*   **Relationships**:
    *   Many-to-many with `Locations` (via `locations`)

### 18. `ReviewKeywords`
*   **Slug**: `reviewKeywords`
*   **Purpose**: Defines keywords for reviews.
*   **Key Fields**: `keyword`.
*   **Relationships**:
    *   One-to-many with `Reviews`

### 19. `Reviews`
*   **Slug**: `reviews`
*   **Purpose**: Stores customer reviews.
*   **Key Fields**: `title`, `rating`, `comment`, `user` (relationship to `users`), `location` (relationship to `locations`), `keywords` (relationship to `reviewKeywords`, hasMany).
*   **Relationships**:
    *   Many-to-one with `Users` (via `user`)
    *   Many-to-one with `Locations` (via `location`)
    *   Many-to-many with `ReviewKeywords` (via `keywords`)

### 20. `ServerReports`
*   **Slug**: `serverReports`
*   **Purpose**: Stores server reports.
*   **Key Fields**: `title`, `date`, `server` (relationship to `users`), `location` (relationship to `locations`), `notes`.
*   **Relationships**:
    *   Many-to-one with `Users` (via `server`)
    *   Many-to-one with `Locations` (via `location`)

### 21. `ShiftTypes`
*   **Slug**: `shiftTypes`
*   **Purpose**: Defines types of shifts.
*   **Key Fields**: `name`.

### 22. `UpgradeTypes`
*   **Slug**: `upgrade-types`
*   **Purpose**: Defines categories for upgrades.
*   **Key Fields**: `name`.
*   **Relationships**:
    *   One-to-many with `Upgrades`

### 23. `Upgrades`
*   **Slug**: `upgrades`
*   **Purpose**: Tracks system and facility upgrades.
*   **Key Fields**: `name`, `location` (relationship to `locations`), `upgrade_type` (relationship to `upgrade-types`), `status`, `description` (richText), `cost`, `vendor` (relationship to `contacts`), `scheduled_date`, `completion_date`, `notes` (richText), `attachments` (relationship to `media`, hasMany).
*   **Relationships**:
    *   Many-to-one with `Locations` (via `location`)
    *   Many-to-one with `UpgradeTypes` (via `upgrade_type`)
    *   Many-to-one with `Contacts` (via `vendor`)
    *   Many-to-many with `Media` (via `attachments`)
*   **Payload 3.0 Notes**: Uses `richText` fields for `description` and `notes`, leveraging the Lexical WYSIWYG editor.

## Lexical WYSIWYG Editor in Payload 3.0

Payload 3.0 integrates the Lexical WYSIWYG editor for `richText` fields, offering a modern and extensible content editing experience. Key benefits include:

*   **Performance**: Designed for high performance and responsiveness.
*   **Extensibility**: Highly customizable with a plugin-based architecture, allowing for tailored editing features.
*   **Accessibility**: Built with accessibility in mind.
*   **Collaboration**: Supports collaborative editing features.

Developers can configure Lexical to include various formatting options, embeds, and custom elements, providing a powerful tool for content creators within the Payload admin panel.
