#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyPipelineStack } from '../lib/app';

const app = new cdk.App();
new MyPipelineStack(app, 'OnePieceArenaProdInfrastructureCDK', {
  env: {
    account: '571793088347',
    region: 'us-east-1',
  }
});

app.synth();