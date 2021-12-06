# Dynamic Form Builder - With Step Wizard

[Open live](https://jannden.gitlab.io/form-builder-with-step-wizard/)

## Description

Build multi-step forms with src/wizardJSON.js.

It supports these standard field types: text input, select, checkbox, email input, textarea, file upload.

It also supports generic field visibility (for example the email field should be visible only when the subscribe checkbox is checked). Each field object can now have a property showIfChecked which stores the ID of another field. For example if we set showIfChecked:"subscribe" to an email address field, we will show that field only if a checkbox with id="subscribe" is checked.
