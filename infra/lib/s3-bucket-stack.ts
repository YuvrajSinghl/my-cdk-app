import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class S3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket
    const bucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: `my-s3-bucket-${this.account}`, // Ensure globally unique name
      versioned: true, // Enable versioning
      removalPolicy: RemovalPolicy.DESTROY, // Deletes bucket when stack is deleted
      lifecycleRules: [
        {
          id: 'DeleteAfter3Days',
          expiration: cdk.Duration.days(3), // Deletes objects after 3 days
          noncurrentVersionExpiration: cdk.Duration.days(3), // Deletes non-current versions after 3 days
        },
      ],
    });

    // Output the bucket name
    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
    });
  }
}
