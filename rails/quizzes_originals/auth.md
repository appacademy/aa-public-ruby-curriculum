# Rails Auth

<quiz>
  <question >
  <p>Which of the following statements about cookies are true? They are ...</p>
    <answer>Stored on the server.</answer>
    <answer correct>Uploaded with every HTTP request.</answer>
    <answer>Safe from attacks.</answer>
    <explanation>Cookies are stored with the client's browser and are therefore not safe from attack!</explanation>
  </question>
</quiz>

<quiz>
  <question >
  <p>T/F: Model instances get destroyed after an HTTP response has been sent by Rails.</p>
    <answer correct>True</answer>
    <answer>False</answer>
    <explanation>True! With the end of each HTTP response all model instances are destroyed.</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
  <p>Which of the following statements about `Flash` and `Flash.now` are true? (Select all that apply.)</p>
    <answer correct>`Flash` is accessible during the next request; `Flash.now` is accessible only during the current request</answer>
    <answer>`Flash.now` is accessible during the next request; `Flash`is accessible only during the current request</answer>
    <answer correct>`Flash`is usually used with redirects while `Flash.now` is usually used with renders</answer>
    <answer>`Flash.now` is usually used with redirects while `Flash`is usually used with renders</answer>
    <explanation>`Flash` is accessible during the next request which is why you use it with redirects. `Flash.now` is accessible during the current request which is why you use it with `render`.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>What is a CSRF attack?</p>
    <answer>A Cross-Site Response Fraud attack in which a form fails to submit correctly</answer>
    <answer correct>A Cross-Site Request Forgery attack in which one site holds a form that acts on another site's server</answer>
    <answer>A Cross-Site Response Forgery attack in which a form is submitted multiple times from a single click</answer>
    <explanation>A CSRF attack is when one site holds a form that acts on another site's server. One site would be creating a *request forgery* to another site.</explanation>
  </question>
</quiz>

```html
<input
  type="hidden"
  name="authenticity_token"
  value="<% form_authenticity_token %>"
/>
```

<quiz>
  <question>
  <p>What is wrong with the above code?</p>
    <answer>The input type should be `text` instead of `hidden`.</answer>
    <answer>The name should be `form_authenticity_token` and the value should be `authenticity_token`.</answer>
    <answer correct>It uses incorrect ERB tags for the value attribute.</answer>
    <answer>The input needs a label surrounding it.</answer>
    <explanation>If you want the value to be returned, you need to use printing ERB tags (`<%= %>`)</explanation>
  </question>
</quiz>
