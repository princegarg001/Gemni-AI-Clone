## Summary

This PR adds a **configuration-driven custom fields system** to the Sample Entry (Add Order) form, enabling labs to capture additional metadata during sample creation without code changes.

### Backend (5-layer architecture)
- **Database**: Liquibase migration creates `custom_field` and `custom_field_value` tables
- **Entities**: [CustomField](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/customfield/valueholder/CustomField.java:13:0-122:1), [CustomFieldValue](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/customfield/valueholder/CustomFieldValue.java:14:0-68:1), `CustomFieldType` enum (extends [BaseObject](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/common/valueholder/BaseObject.java:28:0-220:1))
- **DAO/Service**: `CustomFieldDAO/Impl`, 
<img width="1882" height="887" alt="Screenshot 2026-02-26 165723" src="https://github.com/user-attachments/assets/557136c3-bc20-493b-b95d-c67e4b9301e0" />
<img width="1847" height="714" alt="Screenshot 2026-02-26 165342" src="https://github.com/user-attachments/assets/bde4934a-443c-4f79-8079-881223b76ec9" />
`CustomFieldValueDAO/Impl`, `CustomFieldService/Impl`, `CustomFieldValueService/Impl`
- **REST API**: [CustomFieldRestController](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/customfield/controller/rest/CustomFieldRestController.java:18:0-66:1) at `/rest/custom-fields` (GET, POST, PUT, deactivate)
- **DTO**: [CustomFieldValueDTO](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/customfield/dto/CustomFieldValueDTO.java:2:0-30:1) for API data transfer

### Frontend
- [CustomFields.js](cci:7://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/frontend/src/components/addOrder/CustomFields.js:0:0-0:0) — Dynamic React component using Carbon Design System
- Supports 6 field types: STRING, INTEGER, DECIMAL, BOOLEAN, DATE, CHOICE
- Integrated into Add Order wizard on Sample page
- i18n support for English and French
- 
## Architecture

```mermaid
flowchart LR
    A["🖥️ React UI<br/>CustomFields.js"] -->|"GET /rest/custom-fields"| B["🔌 REST Controller"]
    B --> C["⚙️ Service Layer"]
    C --> D["💾 DAO Layer"]
    D --> E["🗄️ PostgreSQL<br/>custom_field<br/>custom_field_value"]
```


## Screenshots

<img width="1882" height="887" alt="Screenshot 2026-02-26 165723" src="https://github.com/user-attachments/assets/6271758a-95b4-4
<img width="1858" height="677" alt="Screenshot 2026-02-26 174110" src="https://github.com/user-attachments/assets/bddb1e8a-a123-4a69-ac2a-ce1144b59eed" />
583-a6ea-f2833ada9711" />



## Demo Video

https://github.com/user-attachments/assets/652a3448-f662-461f-ac11-f3e186c69f08


## Related Issue


Resolves #2878

## Other

- All backend classes follow existing project patterns ([BaseObject](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/common/valueholder/BaseObject.java:28:0-220:1), [BaseDAOImpl](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/common/daoimpl/BaseDAOImpl.java:53:0-988:1), [BaseObjectServiceImpl](cci:2://file:///c:/Users/princ/OneDrive/Desktop/OpenELIS-Global-2/src/main/java/org/openelisglobal/common/service/BaseObjectServiceImpl.java:19:0-344:1))
- Backward-compatible — if no custom fields are defined, the section does not render
- Soft-delete support via deactivation to preserve data integrity
- No existing functionality was altered — only new files and minimal integration points
