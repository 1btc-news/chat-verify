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

// gap and minH set below are based on the stepper being
// in vertical orientation for sm/md screens, defined
// in page-content.tsx

function VerificationStepper(props: {
  activeStep: number | undefined;
  orientation: "horizontal" | "vertical";
}) {
  return (
    <Stepper
      index={props.activeStep || 0}
      orientation={props.orientation || "horizontal"}
      my={8}
      gap={[0, null, 4]}
      minH={["400px", null, "auto"]}
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
