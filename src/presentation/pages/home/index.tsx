import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

import { TemplateRoot } from '@/presentation/template';
import { PressableOption, Input, CalcDetail } from '@/presentation/components';

import {
  AlignOptionsView,
  ButtonView,
  ContainerView,
  PressableView,
} from './style';

const formSchema = z.object({
  ['product-value']: z.coerce.number(),
  ['entry-value']: z.coerce.number(),
  months: z.coerce.number(),
  fees: z.coerce.number(),
});

type FormSchema = z.infer<typeof formSchema>;

const interstitial = InterstitialAd.createForAdRequest(
  'ca-app-pub-6202074218659375/4143382226'
);

export const Home: React.FC = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [data, setData] = useState<FormSchema>();

  const toggleOpenInfo = (): void => {
    setOpenInfo(!openInfo);
  };

  const onSubmit = (values: FormSchema) => {
    interstitial.loaded && interstitial.show();
    setData(values);
    toggleOpenInfo();
  };

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {}
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  return (
    <TemplateRoot>
      <ContainerView>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Valor do Produto"
              value={value?.toString()}
              keyboardType="numeric"
              onChangeText={(text: string) => onChange(text)}
              money
            />
          )}
          name="product-value"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Valor da Entrada"
              value={value?.toString()}
              keyboardType="numeric"
              onChangeText={(text: string) => onChange(text)}
              money
            />
          )}
          name="entry-value"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Numero de Parcelas"
              value={value?.toString()}
              keyboardType="numeric"
              onChangeText={(text: string) => onChange(text)}
            />
          )}
          name="months"
          rules={{ required: true }}
        />
        <AlignOptionsView>
          <PressableOption value="12x" onPress={() => setValue('months', 12)} />
          <PressableOption value="24x" onPress={() => setValue('months', 24)} />
          <PressableOption value="48x" onPress={() => setValue('months', 48)} />
          <PressableOption value="60x" onPress={() => setValue('months', 60)} />
        </AlignOptionsView>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Taxa de juros Mensal"
              value={value?.toString()}
              keyboardType="numeric"
              onChangeText={(text: string) => onChange(text)}
            />
          )}
          name="fees"
          rules={{ required: true }}
        />
        <PressableView
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty && !isValid}
          color={!isDirty && !isValid}
        >
          <ButtonView>Assista para calcular</ButtonView>
          <Ionicons name="videocam" size={18} color="#ffffff" />
        </PressableView>
      </ContainerView>
      {openInfo && (
        <CalcDetail dataCalc={data} onClose={() => toggleOpenInfo()} />
      )}
    </TemplateRoot>
  );
};
