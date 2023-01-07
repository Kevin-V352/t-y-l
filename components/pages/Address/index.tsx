/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, ChangeEvent, useRef, useEffect, useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, RadioGroup } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import * as yup from 'yup';

import { CartContext } from '@/contexts';
import { ClientFormData, ClientFormType } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button, Checkbox, TextInput } from '@/ui';
import { getters } from '@/utils';

import * as S from './styles';

const Address: FC = () => {

  const formType = useRef<ClientFormType>('');
  const saveUserData = useRef<boolean>(false);

  const { setClientData } = useContext(CartContext);

  const styledTheme = useTheme();
  const router = useRouter();
  const { t } = useTranslation('address');

  const formValidation = yup.object().shape({
    paymentMethod:  yup.string().required(t('errors.payment_methods')),
    deliveryMethod: yup.string().required(t('errors.delivery_methods')),
    name:           yup.string().required(t('errors.name_input')),
    phoneNumber:    yup.string().required(t('errors.phone_number_input'))
  });

  const formValidationWithAddress = formValidation.shape({
    city:    yup.string().required(t('errors.city_input')),
    address: yup.string().required(t('errors.address_input'))
  });

  const getValidationSchema = (type: ClientFormType): any => {

    switch (type) {

      case 'home_delivery':
        return formValidationWithAddress;

      default:
        return formValidation;

    };

  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<ClientFormData>({
    resolver:      yupResolver(getValidationSchema(formType.current)),
    // TODO: Corregir bug de hidratacion al recargar
    defaultValues: getters.getUserDataFromCookies()
  });

  useEffect(() => {

    if (Object.keys(errors).length > 0 && formType.current === 'home_delivery') {

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      trigger(['city', 'address']);

    };

  }, [formType.current]);

  const commonFormControlLabelProps = {
    styledTheme,
    control: <S.CustomRadio styledTheme={styledTheme} />
  };

  const changeRadioGroupState = (event: ChangeEvent<HTMLInputElement>): void => {

    const { name, value } = event.target;

    if (name === 'deliveryMethod') formType.current = value;

    // TODO: Corregir esto
    // @ts-expect-error: Unreachable code error
    setValue(name, value, { shouldValidate: true });

  };

  const onSubmit = async (data: ClientFormData): Promise<void> => {

    setClientData(data, saveUserData.current);
    await router.push('/checkout/summary');

  };

  return (
    <MainLayout
      title={`T&L | ${t('page.title')}`}
      desc=''
    >
      <S.Container>
        <S.Title>{t('page.title')}</S.Title>
        <S.Form onSubmit={handleSubmit(onSubmit)}>

          <FormControl
            error={!!errors.paymentMethod}
          >
            <S.CustomFormLabel
              id="payment-method-radio-buttons-group"
              styledTheme={styledTheme}
            >
              Método de pago
            </S.CustomFormLabel>
            <RadioGroup
              aria-labelledby="payment-method-radio-buttons-group"
              name="paymentMethod"
              value={getValues('paymentMethod')}
              onChange={changeRadioGroupState}
            >
              <S.CustomFormControlLabel
                value="cash"
                label={t('payment_methods.cash')}
                {...commonFormControlLabelProps}
              />
              <S.CustomFormControlLabel
                value="credit_card"
                label={t('payment_methods.credit_card')}
                {...commonFormControlLabelProps}
              />
              <S.CustomFormControlLabel
                value="debit_card"
                label={t('payment_methods.debit_card')}
                {...commonFormControlLabelProps}
              />
            </RadioGroup>
            <S.CustomFormHelperText styledTheme={styledTheme}>
              {errors.paymentMethod?.message}
            </S.CustomFormHelperText>
          </FormControl>

          <S.Separator />

          <FormControl
            error={!!errors.deliveryMethod}
          >
            <S.CustomFormLabel
              id="delivery-method-radio-buttons-group"
              styledTheme={styledTheme}
            >
              Método de entrega
            </S.CustomFormLabel>
            <RadioGroup
              aria-labelledby="delivery-method-radio-buttons-group"
              name="deliveryMethod"
              value={getValues('deliveryMethod')}
              onChange={changeRadioGroupState}
            >
              <S.CustomFormControlLabel
                value="withdrawal_by_local"
                label={t('delivery_methods.withdrawal_by_local')}
                {...commonFormControlLabelProps}
              />
              <S.CustomFormControlLabel
                value="home_delivery"
                label={t('delivery_methods.home_delivery')}
                {...commonFormControlLabelProps}
              />
            </RadioGroup>
            <S.CustomFormHelperText styledTheme={styledTheme}>
              {errors.deliveryMethod?.message}
            </S.CustomFormHelperText>
          </FormControl>

          <S.Separator />

          <TextInput
            label={t('name_input')}
            type="text"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />

          <TextInput
            label={t('phone_number_input')}
            type="tel"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />

          {
            (getValues('deliveryMethod') === 'home_delivery') &&
            (
              <>
                <TextInput
                  label={t('city_input')}
                  type="text"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  {...register('city')}
                />

                <TextInput
                  label={t('address_input')}
                  type="text"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  {...register('address')}
                />
              </>
            )
          }

          <S.Separator />

          <Checkbox
            label={t('save_user_data_message')}
            // eslint-disable-next-line padded-blocks
            onChange={(_, checked) => { saveUserData.current = checked; }}
          />

          <S.ButtonWrapper>
            <Button
              text={t('btn_1')}
              variant="primary"
              type="submit"
              fluid
            />
          </S.ButtonWrapper>

        </S.Form>
      </S.Container>
    </MainLayout>
  );

};

export default Address;
