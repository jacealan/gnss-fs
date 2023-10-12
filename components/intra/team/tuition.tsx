import { useEffect, useState } from "react"

import { useRealViewport } from "next-real-viewport"
import { Flex, Box, Grid, GridItem } from "@chakra-ui/react"
import { Radio, RadioGroup } from "@chakra-ui/react"
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"

import colors from "@/theme/colors"

// Create an Intl.NumberFormat formatter with desired options
const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  // minimumFractionDigits: 2,
  // maximumFractionDigits: 2,
})

export default function Tuition({
  teamData,
  teamId,
}: {
  teamData: any
  teamId: string | string[]
}) {
  const [tuitions, setTuitions] = useState<number[]>(teamData?.tuitions)
  const [tuition, setTuition] = useState<string>("0")
  const [value, setValue] = useState<number>(1)
  const handleChangeNumberInput = (_: string, value: number) => {
    setValue(value)
  }
  const handleChangeSlider = (value: number) => {
    setValue(value)
  }

  // console.log(teamData?.tuitions)
  // console.log(tuitions)
  useEffect(() => {
    setTuitions(teamData?.tuitions)
  }, [teamData])

  return (
    <>
      <RadioGroup onChange={setTuition} value={tuition} mb={2}>
        <Grid
          templateColumns={"1fr 1fr 1fr"}
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          // gap={1}
        >
          {tuitions?.map((select: number, index: number) => (
            <GridItem key={index}>
              <Radio value={select.toString()}>
                {numberFormatter.format(select)}
              </Radio>
            </GridItem>
          ))}
        </Grid>
      </RadioGroup>
      <Flex
        w="100%"
        border={`solid 1px ${colors.blue1}`}
        borderRadius={"10px"}
        p={2}
      >
        <Box mt={1}>{numberFormatter.format(Number(tuition))}</Box>
        <Box mt={1}>&nbsp;×&nbsp;</Box>
        <Box>
          <NumberInput
            allowMouseWheel
            min={1}
            max={30}
            size="sm"
            maxW="120px"
            // mr="2rem"
            value={value}
            onChange={handleChangeNumberInput}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            flex="1"
            focusThumbOnChange={false}
            value={value}
            onChange={handleChangeSlider}
            min={1}
            max={15}
            ml={4}
            w="80px"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px">
              {value}
            </SliderThumb>
          </Slider>
        </Box>
        <Box mt={1}>&nbsp;&nbsp;=&nbsp;&nbsp;</Box>
        <Box mt={1}>
          <Box>{numberFormatter.format(Number(tuition) * value)}</Box>
          <Box>
            {numberFormatter.format(
              Math.floor((Number(tuition) * value * 0.95) / 100) * 100
            )}{" "}
            <span style={{ fontSize: "0.7rem" }}>(5%↓)</span>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
