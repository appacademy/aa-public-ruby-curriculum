# Rails Auth

Which of the following statements about cookies are true? They are ...
- [ ] Stored on the server.
- [ ] Uploaded with every HTTP request.
- [ ] Safe from attacks.

<details><summary>Answer:</summary>
Uploaded with every HTTP request.</details>
<details><summary>Explanation:</summary>

Cookies are stored with the client's browser and are therefore not safe from attack!</details>

T/F: Model instances get destroyed after an HTTP response has been sent by Rails.
- [ ] True
- [ ] False

<details><summary>Answer:</summary>
True</details>
<details><summary>Explanation:</summary>

True! With the end of each HTTP response all model instances are destroyed.</details>

Which of the following statements about `Flash` and `Flash.now` are true? (Select all that apply.)
- [ ] `Flash` is accessible during the next request; `Flash.now` is accessible only during the current request
- [ ] `Flash.now` is accessible during the next request; `Flash`is accessible only during the current request
- [ ] `Flash`is usually used with redirects while `Flash.now` is usually used with renders
- [ ] `Flash.now` is usually used with redirects while `Flash`is usually used with renders

<details><summary>Answer:</summary>

- `Flash` is accessible during the next request; `Flash.now` is accessible only during the current request
- Flash`is usually used with redirects while `Flash.now` is usually used with renders</details>
<details><summary>Explanation:</summary>

`Flash` is accessible during the next request which is why you use it with redirects. `Flash.now` is accessible during the current request which is why you use it with `render`.</details>

What is a CSRF attack?
- [ ] A Cross-Site Response Fraud attack in which a form fails to submit correctly
- [ ] A Cross-Site Request Forgery attack in which one site holds a form that acts on another site's server
- [ ] A Cross-Site Response Forgery attack in which a form is submitted multiple times from a single click

<details><summary>Answer:</summary>
A Cross-Site Request Forgery attack in which one site holds a form that acts on another site's server</details>
<details><summary>Explanation:</summary>

A CSRF attack is when one site holds a form that acts on another site's server. One site would be creating a *request forgery* to another site.</details>

```html
<input
  type="hidden"
  name="authenticity_token"
  value="<% form_authenticity_token %>"
/>
```
What is wrong with the above code?
- [ ] The input type should be `text` instead of `hidden`.
- [ ] The name should be `form_authenticity_token` and the value should be `authenticity_token`.
- [ ] It uses incorrect ERB tags for the value attribute.
- [ ] The input needs a label surrounding it.

<details><summary>Answer:</summary>
It uses incorrect ERB tags for the value attribute.</details>
<details><summary>Explanation:</summary>

If you want the value to be returned, you need to use printing ERB tags (`<%= %>`)</details>
