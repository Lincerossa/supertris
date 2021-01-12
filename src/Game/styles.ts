import styled from "styled-components";

export const GameWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

export const Game = styled.div`
  display: grid;
  grid-template-rows: ${(props: any) => `repeat(${props.GRID_DIMENSION}, 1fr)`};
  grid-template-columns: ${(props: any) =>
    `repeat(${props.GRID_DIMENSION}, 1fr)`};
  width: ${(props: any) => props.CELL_DIMENSION * props.GRID_DIMENSION}px;
  transform: rotate(45deg);
`;

export const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: #8b008b;
  padding: 0.5rem;
  font-family: sans-serif;
  color: white;
`;

export const Cell = styled.div`
  border: 2px solid #d2d2d2;
  height: ${(props: any) => props.CELL_DIMENSION}px;
  cursor: pointer;
  background: ${(props: any) => (props.isSelected ? "#8b008b" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b008b;
  transition: 0.2s all;
  &:hover {
    ${(props: any) =>
      !props.isSelected &&
      `
      background: #d2d2d2;
    `}
  }
`;

export const CellText = styled.div`
  transform: rotate(-45deg);
  font-size: 2rem;
  text-transform: uppercase;
`;
export const Reset = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  border: 1px solid white;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: sans-serif;
  text-transform: uppercase;
  &:hover {
    background-color: #8b008b;
    color: white;
    border-color: black;
  }
`;

export const OpenDrawer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  font-family: sans-serif;
  text-transform: uppercase;
  &:hover {
    color: #8b008b;
  }
`;

export const WinnerText = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  white-space: break-spaces;
  font-size: 2rem;
  z-index: 1;
`;
