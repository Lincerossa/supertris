import React, { useState, useCallback } from "react";
import * as S from "./styles";
import Confetti from "react-confetti";
import { Form, Input, Button, Drawer, InputNumber } from "antd";

import * as Types from "./types";

import { isWinner } from "./utility";

const InitialConfig = {
  GRID_DIMENSION: 4,
  ADIACENT_ELEMENTS_TO_WIN: 4,
  CELL_DIMENSION: 50,
  FIRST_PLAYER: "🚀",
  SECOND_PLAYER: "🚁",
  FIRST_PLAYER_NAME: "First player",
  SECOND_PLAYER_NAME: "Second player"
};

export default () => {
  const [selectedItems, setItem] = useState<Types.TSelectedItems>([]);
  const [config, setConfig] = useState<Types.IConfig>(InitialConfig);
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = (): void => {
    setVisible(true);
  };
  const onClose = (): void => {
    setVisible(false);
  };

  const {
    FIRST_PLAYER,
    FIRST_PLAYER_NAME,
    SECOND_PLAYER,
    SECOND_PLAYER_NAME,
    GRID_DIMENSION,
    CELL_DIMENSION
  } = config;

  const firstWinner: boolean = isWinner({
    selectedItems: selectedItems.filter((e, i) => !(i % 2)),
    GRID_DIMENSION
  });
  const secondWinner: boolean = isWinner({
    selectedItems: selectedItems.filter((e, i) => i % 2),
    GRID_DIMENSION
  });

  const handleReset = useCallback((): void => {
    setItem([]);
  }, [setItem]);

  const handleCellClick = useCallback(
    (i): void => {
      if (
        setItem &&
        !firstWinner &&
        !secondWinner &&
        selectedItems.indexOf(i) === -1
      ) {
        setItem((e) => [...e, i]);
      }
    },
    [setItem, selectedItems, firstWinner, secondWinner]
  );

  function onFinish(formValues: Types.IConfig): void {
    setConfig(formValues);
    onClose();
  }

  return (
    <S.GameWrapper>
      {(firstWinner || secondWinner) && (
        <>
          <S.WinnerText>
            THE WINNER IS {firstWinner ? FIRST_PLAYER_NAME : SECOND_PLAYER_NAME}
          </S.WinnerText>
          <Confetti />
        </>
      )}

      <S.Game GRID_DIMENSION={GRID_DIMENSION} CELL_DIMENSION={CELL_DIMENSION}>
        {Array.from({ length: GRID_DIMENSION * GRID_DIMENSION }).map((e, i) => {
          const isSelected = selectedItems.indexOf(i) !== -1;
          return (
            <S.Cell
              CELL_DIMENSION={CELL_DIMENSION}
              isSelected={isSelected}
              key={i}
              onClick={() => handleCellClick(i)}
            >
              <S.CellText>
                {isSelected &&
                  (selectedItems.indexOf(i) % 2 ? SECOND_PLAYER : FIRST_PLAYER)}
              </S.CellText>
            </S.Cell>
          );
        })}
      </S.Game>
      <S.Reset onClick={handleReset}>X</S.Reset>
      <S.OpenDrawer onClick={showDrawer}>config</S.OpenDrawer>
      <Drawer
        title="Settings"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        forceRender
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={config}>
          <Form.Item name="FIRST_PLAYER_NAME" label="First player name">
            <Input placeholder="Rossi" />
          </Form.Item>
          <Form.Item name="FIRST_PLAYER" label="First player symbol">
            <Input placeholder="🚀" />
          </Form.Item>

          <Form.Item name="SECOND_PLAYER_NAME" label="Second player name">
            <Input placeholder="Neri" />
          </Form.Item>
          <Form.Item name="SECOND_PLAYER" label="Second player symbol">
            <Input placeholder="🤯" />
          </Form.Item>

          <Form.Item name="GRID_DIMENSION" label="Grid dimension">
            <InputNumber placeholder="5" />
          </Form.Item>

          <Form.Item name="CELL_DIMENSION" label="Cell dimension">
            <InputNumber placeholder="20" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save config
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </S.GameWrapper>
  );
};
