## Summary

This PR adds a **configuration-driven custom fields system** to the Sample Entry (Add Order) form, enabling labs to capture additional metadata during sample creation without code changes.

### Backend (5-layer architecture)
- **Database**: Liquibase migration creates `custom_field` and `custom_field_value` tables
- **Entities**: `CustomField`, `CustomFieldValue`, `CustomFieldType` enum (extends `BaseObject`)
- **DAO/Service**: `CustomFieldDAO/Impl`, `CustomFieldValueDAO/Impl`, `CustomFieldService/Impl`, `CustomFieldValueService/Impl`
- **REST API**: `CustomFieldRestController` at `/rest/custom-fields` (GET, POST, PUT, deactivate)
- **DTO**: `CustomFieldValueDTO` for API data transfer

### Frontend
- `CustomFields.js` — Dynamic React component using Carbon Design System
- Supports 6 field types: STRING, INTEGER, DECIMAL, BOOLEAN, DATE, CHOICE
- Integrated into Add Order wizard on Sample page
- i18n support for English and French

## Architecture

```mermaid
flowchart LR
    A["🖥️ React UI<br/>CustomFields.js"] -->|"GET /rest/custom-fields"| B["🔌 REST Controller"]
    B --> C["⚙️ Service Layer"]
    C --> D["💾 DAO Layer"]
    D --> E["🗄️ PostgreSQL<br/>custom_field<br/>custom_field_value"]
```

## Screenshots

<img width="1882" alt="Custom Fields Section" src="https://github.com/user-attachments/assets/6271758a-95b4-4583-a6ea-f2833ada9711" />

<img width="1858" alt="Custom Fields Multiple Types" src="https://github.com/user-attachments/assets/bddb1e8a-a123-4a69-ac2a-ce1144b59eed" />

<img width="1847" alt="Sample Entry Form" src="https://github.com/user-attachments/assets/bde4934a-443c-4f79-8079-881223b76ec9" />

## Demo Video

https://github.com/user-attachments/assets/652a3448-f662-461f-ac11-f3e186c69f08

## Related Issue

Resolves #2878

## Other

- All backend classes follow existing project patterns (`BaseObject`, `BaseDAOImpl`, `BaseObjectServiceImpl`)
- Backward-compatible — if no custom fields are defined, the section does not render
- Soft-delete support via deactivation to preserve data integrity
- No existing functionality was altered — only new files and minimal integration points
