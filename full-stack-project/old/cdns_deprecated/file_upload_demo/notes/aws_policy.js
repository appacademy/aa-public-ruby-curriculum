{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1420751757000",
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::BUCKET-NAME-DEV",
        "arn:aws:s3:::BUCKET-NAME-DEV/*",
        "arn:aws:s3:::BUCKET-NAME-PRO",
        "arn:aws:s3:::BUCKET-NAME-PRO/*"
      ],
      "Principal": "*"
    }
  ]
}
