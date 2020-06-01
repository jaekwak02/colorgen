import React from "react";
import styled from "styled-components";
import Color from "color";
import Joi from "@hapi/joi";
import Button from "../components/Button";
import VerticalLayout from "../components/VerticalLayout";
import RadioInput from "../components/RadioInput";
import { generateTheme } from "../utils";

const schemeOptions = [
  { label: "Monochromatic", value: "monochromatic" },
  { label: "Analogous", value: "analogous" },
  { label: "Complementary", value: "complementary" },
  { label: "Split Complementary", value: "split-complementary" },
  { label: "Tetradic", value: "tetradic" },
];

const generatorSchema = Joi.object({
  scheme: Joi.string(),
});

const ThemeGenerator = ({
  theme,
  onGeneratorChange,
  onGenerate,
  onColorClick,
}) => {
  const { value: generator } = generatorSchema.validate(theme.generator || {}, {
    allowUnknown: false,
  });

  return (
    <ElContainer>
      <VerticalLayout>
        <RadioInput
          value={generator.scheme}
          onChange={(scheme) => onGeneratorChange({ ...generator, scheme })}
          options={schemeOptions}
        />

        {/* <div>
          <Badge info>
            {schemeOptions.find((o) => o.value === generator.scheme)?.label}
          </Badge>
        </div> */}

        <div>
          <Button
            onClick={() => {
              const colors = generateTheme(generator.scheme, true);

              onGenerate(colors);
            }}
          >
            Generate
          </Button>
        </div>

        <ElColors>
          {theme.colors.map((color, colorIndex) => {
            const isDark = Color(color.color).isDark();

            return (
              <ElColor
                key={colorIndex}
                style={{
                  backgroundColor: color.color,
                  color: isDark ? "white" : "black",
                }}
              >
                {color.color}
              </ElColor>
            );
          })}
        </ElColors>
      </VerticalLayout>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  /* display: grid;
  padding: 30px; */
  /* border: 1px solid var(--color-neutral-500); */
`;

const ElColors = styled.div`
  border: 1px solid var(--color-neutral-600);
  background-color: var(--color-neutral-600);

  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
`;

const ElColor = styled.div`
  height: 120px;

  display: grid;
  align-items: center;
  justify-items: center;
`;

export default ThemeGenerator;
