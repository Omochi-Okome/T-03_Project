// MaterialButtonの使い方
// 【引数について】
// style...任意の装飾を施すときに渡す
// onPress...処理したい関数を渡す
// iconName...どのMaterialIconのアイコンを使うかを指定する
// iconSize...数値を渡す
// iconColor...アイコンのカラーを指定する
// title...アイコンの隣に配置するタイトル(Optional)

import { Pressable, Text, GestureResponderEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type MaterialButtonProps = {
  color: string;
  style: object;
  onPress: (event: GestureResponderEvent) => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconSize: number;
  iconColor: string;
  title: string;
  fontSize: number;
};

const MaterialButton = ({
  color,
  style,
  onPress,
  iconName,
  iconSize,
  iconColor,
  title,
  fontSize,
}: MaterialButtonProps) => {
  return (
    <Pressable
      style={style}
      onPress={onPress}
    >
      <MaterialIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
      {title ? <Text style={{ fontSize: fontSize, color: color }}>{title}</Text> : null}
    </Pressable>
  );
};

export default MaterialButton;
