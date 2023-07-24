import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { registrationSteps } from "../../constants";

function VerificationStepper(props: {
  activeStep: number;
  orientation: "horizontal" | "vertical";
}) {
  return (
    <Stepper
      index={props.activeStep}
      orientation={props.orientation || "horizontal"}
      my={8}
      variant="1btc-orange"
      colorScheme="1btc-orange"
    >
      {registrationSteps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default VerificationStepper;
