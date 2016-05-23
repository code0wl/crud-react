# Simple plot Component
<img src="demo.gif" />

#### Start the project locally with
```
npm start
```

#### Usage
Once the server stars, head to http://localhost:3000
You may change the express endpoints via the server.js file.

#### List of urls (test with postman or chrome)
Server starts at port 3000, can be configured in server.js

<ul>
<li>GET/ http://localhost:3000/addresses</li>
<li>GET/ http://localhost:3000/address/id (zerobased starting at 0)</li>
<li>POST/ http://localhost:3000/addresses (creates new item(s))</li>
<li>PUT/ http://localhost:3000/addresses/id (creates new item(s))</li>
<li>DELETE/ http://localhost:3000/addresses/id (removes item id) </li>
</ul>

#### Features
- Add Address
- CRUD using node middleware (express)
- Modern UI with animations
- Address list search
- Mock server with json api responds
- Flexbox grid and styles
- Shims and polyfills for older browsers
- Markers
- Notification system for updating events
- Animate to position
- Rich user data
- Custom design
- Indicators of application state (how many users currently tracked
- Autosuggestion map correlation
- Did not get to user test the UI; So, made a video of how it works

####The MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
