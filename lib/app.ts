import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stacks/BetaStage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //pipeline
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'OPA-Pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('angelgce/OPA-Pipeline', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    
    //beta - stage
    const betaStage = pipeline.addStage(new MyPipelineAppStage(this, "Beta", {
      env: { account: "571793088347", region: "us-east-1" }
    }));

    betaStage.addPost(new ManualApprovalStep('approval'));
  }
}