# Dynamic Form Builder - Hooks

[Open live](https://jannden.gitlab.io/form-builder-on-react-starter-hooks/)

## New

- Internal validation added (in addition to Bootstrap HTML5). In order to test it, first
  turn off the HTMl5 Bootstrap validation by removing the attribute validated from the Form tag in the DynamicFormBuilder component.
- Components are now broken down to individual files
- Rewritten from class to functional components
- Using hooks
- A general module is used to dynamically recall the correct component: ./formComponents/FormComponents.jsx

## Description

Build forms with src/formJSON.js.

It supports these standard field types: text input, select, checkbox.

It supports these extra field types: email input, textarea, file upload.

It also supports generic field visibility (for example the email field should be visible only when the subscribe checkbox is checked). Each field object can now have a property showIfChecked which stores the ID of another field. For example if we set showIfChecked:"subscribe" to an email address field, we will show that field only if a checkbox with id="subscribe" is checked.

## Build on React Starter

This React Starter is based on the [Robin Wieruch series](https://www.robinwieruch.de/javascript-project-setup-tutorial/) with my own upgrades and Bootstrap support.
