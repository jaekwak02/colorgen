import React, { useState } from "react";
import styled from "styled-components";
import Color from "color";
import Joi from "@hapi/joi";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import RadioInput from "../components/RadioInput";
import { generateTheme, isValidColorHex } from "../utils";

const schemeOptions = [
  { label: "Monochromatic", value: "monochromatic" },
  { label: "Analogous", value: "analogous" },
  { label: "Complementary", value: "complementary" },
  { label: "Split Complementary", value: "split-complementary" },
  { label: "Tetradic", value: "tetradic" },
];

const generatorSchema = Joi.object({
  scheme: Joi.string(),
  base: Joi.string(),
  locked: Joi.bool(),
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

  const [baseColorInput, setBaseColorInput] = useState(generator.base);

  return (
    <ElContainer>
      <VerticalLayout>
        {!generator.locked && (
          <HorizontalLayout style={{ alignItems: "start" }}>
            <VerticalLayout>
              <div>Scheme</div>
              <RadioInput
                value={generator.scheme}
                onChange={(scheme) =>
                  onGeneratorChange({ ...generator, scheme })
                }
                options={schemeOptions}
              />
            </VerticalLayout>
            <VerticalLayout>
              <div>Base Color</div>
              <HorizontalLayout>
                <TextInput
                  value={baseColorInput}
                  onChange={(e) => {
                    setBaseColorInput(e.target.value);

                    if (
                      isValidColorHex(e.target.value) ||
                      e.target.value === ""
                    ) {
                      onGeneratorChange({
                        ...generator,
                        base: e.target.value.toUpperCase(),
                      });
                    }
                  }}
                />
                <ElBaseIndicator
                  style={{
                    backgroundColor:
                      generator.base || "var(--color-neutral-200)",
                  }}
                >
                  {!generator.base && "✕"}
                </ElBaseIndicator>
              </HorizontalLayout>
            </VerticalLayout>
          </HorizontalLayout>
        )}

        <HorizontalLayout>
          {!generator.locked && (
            <Button
              onClick={() => {
                const colors = generateTheme(
                  generator.scheme,
                  true,
                  generator.base
                );

                onGenerate(colors);
              }}
            >
              Generate
            </Button>
          )}
          <Button
            onClick={() => {
              onGeneratorChange({
                ...generator,
                locked: !generator.locked,
              });
            }}
          >
            {generator.locked ? "Unlock" : "Lock"}
          </Button>
        </HorizontalLayout>

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

const ElContainer = styled.div``;

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

const ElBaseIndicator = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid var(--color-neutral-500);

  display: grid;
  align-items: center;
  justify-items: center;

  user-select: none;
`;

export default ThemeGenerator;
