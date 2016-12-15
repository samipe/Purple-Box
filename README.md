# Purple Box
Purple Box is scalable serverless platform that gathers and monitors sensordata. To send data to the purple box you need a client device, such as an Android phone.

# Receiving data in a web client

    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
    const socket = io().connect('http://your.url.here.com/3000');
    $(document).ready(function () {
	  socket.on('your_app_id', function (msg1) {
        let dataEntry = JSON.stringify(msg1) + "<br>";
        $(".json-dump").append(dataEntry);
	  });
    });
    </script>
    <html>
    <head>
    <title>JSON Dump</title>
    </head>
     <body>
      <div class="json-dump">
      </div>
     </body>
    </html>
    
# Sending JSON-data

    class AsyncT extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... voids) {
            HttpClient httpclient = new DefaultHttpClient();
            HttpPost post = new HttpPost("http://busdata.metropolia.fi:80/bussidata");
            post.addHeader("Content-Type", "application/json; charset=UTF-8");

            try {
                JSONObject jsonobj = new JSONObject();
                jsonobj.put("msg", Toimii.);

                StringEntity se = new StringEntity(jsonobj.toString());
                Log.e("mainToPost", "mainToPost" + jsonobj.toString());
                post.setEntity(se);

                // Execute HTTP Post Request
                HttpResponse response = httpclient.execute(post);

            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
    }
