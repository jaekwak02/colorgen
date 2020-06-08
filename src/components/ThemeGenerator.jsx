import React, { useState } from "react";
import styled from "styled-components";
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
  scheme: Joi.string().allow("").default(""),
  base: Joi.string().allow("").default(""),
  locked: Joi.bool().default(false),
  hueMin: Joi.number().default(0),
  hueMax: Joi.number().default(360),
  saturationMin: Joi.number().default(15),
  saturationMax: Joi.number().default(100),
  lightnessMin: Joi.number().default(15),
  lightnessMax: Joi.number().default(85),
});

const ThemeGenerator = ({
  theme,
  onGeneratorChange,
  onGenerate,
  onColorClick,
}) => {
  const { value: generator } = generatorSchema.validate(theme.generator || {}, {
    allowUnknown: true,
  });

  console.log({ generator });

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
            {/* <VerticalLayout>
              <RangeInput
                value={[generator.hueMin, generator.hueMax]}
                label="Hue Range"
                max={360}
                onChange={([hueMin, hueMax]) =>
                  onGeneratorChange({ ...generator, hueMin, hueMax })
                }
              />
              <RangeInput
                value={[generator.saturationMin, generator.saturationMax]}
                label="Saturation Range"
                max={100}
                onChange={([saturationMin, saturationMax]) =>
                  onGeneratorChange({
                    ...generator,
                    saturationMin,
                    saturationMax,
                  })
                }
              />
              <RangeInput
                value={[generator.lightnessMin, generator.lightnessMax]}
                label="Lightness Range"
                max={100}
                onChange={([lightnessMin, lightnessMax]) =>
                  onGeneratorChange({
                    ...generator,
                    lightnessMin,
                    lightnessMax,
                  })
                }
              />
            </VerticalLayout> */}
          </HorizontalLayout>
        )}

        <HorizontalLayout>
          {!generator.locked && (
            <Button
              onClick={() => {
                const colors = generateTheme(
                  generator.scheme,
                  true,
                  generator.base,
                  generator
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
            {generator.locked ? "Unlock Generator" : "Lock"}
          </Button>
        </HorizontalLayout>
      </VerticalLayout>
    </ElContainer>
  );
};

const ElContainer = styled.div``;

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
