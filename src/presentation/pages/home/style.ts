import styled from 'styled-components/native';

type Props = {
  color: boolean;
};

export const ContainerView = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 20px 25px 0px;
`;
export const AlignOptionsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;
export const PressableView = styled.Pressable<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => (props.color ? '#65656550' : '#656565')};
  padding: 10px 20px;
  width: 100%;
  border-radius: 20px;
`;
export const ButtonView = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #fff;
  margin-right: 20px;
`;
