const S3 = require('aws-sdk/clients/s3');
const client = new S3({
	region: 'eu-west-2'
});

const params = {
	Bucket: 'experion-tmp',
	Key: 'ddd.csv',
	ExpressionType: 'SQL',
   Expression: 'SELECT * FROM S3Object',
	InputSerialization: {
		CSV: {
			FileHeaderInfo: 'USE',
			RecordDelimiter: '\n',
			FieldDelimiter: ','
		}
	},
	OutputSerialization: {
		CSV: {}
	}
};

client.selectObjectContent(params, (err, data) => {
	if (err) {
        console.log("Err :" + err);
		return;
	}

	// data.Payload is a Readable Stream
    const eventStream = data.Payload;
    console.log("eventStream :" + eventStream);

	// Read events as they are available
	eventStream.on('data', (event) => {
		if (event.Records) {
			// event.Records.Payload is a buffer containing
			// a single record, partial records, or multiple records
			process.stdout.write(event.Records.Payload.toString());
		} else if (event.Stats) {
			console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
		} else if (event.End) {
			console.log('SelectObjectContent completed');
		}
	});

	// Handle errors encountered during the API call
	eventStream.on('error', (err) => {
		switch (err.name) {
			// Check against specific error codes that need custom handling
		}
	});

	eventStream.on('end', () => {
		// Finished receiving events from S3
	});
});