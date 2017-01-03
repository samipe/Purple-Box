# Purple Box
Purple Box is scalable serverless platform that gathers and monitors sensordata. To send data to the purple box you need a client device, such as an Android phone.

# Usage example

## Receiving data in a web client

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
    
## Sending JSON-data

    class AsyncT extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... voids) {
            HttpClient httpclient = new DefaultHttpClient();
            HttpPost post = new HttpPost("http://your.url.here.com:80");
            post.addHeader("Content-Type", "application/json; charset=UTF-8");

            try {
                JSONObject jsonobj = new JSONObject();
                jsonobj.put("msg", "all good!”);

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

## Accepted JSON key-value pairs with example values

    “Appid”:”VisitorCounter”
    "Devid":"1"
    "TimeStamp":"24.12.2016 12:00:00"
    “Location”: 
    	“Coordinates” : [62.123, 21.512]
    	“Speed”:”10m/s”
    	“Heading”:”123”
    	“Altitude”:”123”
    “Audio”:
    	“MaxDecibel”:”70db”
    “MotionSensor”:
    	“Acceleration”:”[9.8, 1.1, 0.2]”
    	“Stepcounter”:”123”
    “Device”:
    	“Battery”:”43”
    	“Msg”:"all good!”
    	“Storage”:”10/32gb”
	
##Purple Box App
[Purple Box App](https://github.com/Robobussitiimi/Purple-Box-App)

