/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, ChangeEvent, useRef, useEffect, useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormGroup, RadioGroup } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import * as yup from 'yup';

import { CartContext } from '@/contexts';
import { ClientFormData, ClientFormType } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button, TextInput } from '@/ui';
import { getters } from '@/utils';

import * as S from './styles';

const formValidation = yup.object().shape({
  paymentMethod:  yup.string().required('El método de pago es requerido'),
  deliveryMethod: yup.string().required('El método de envío es requerido'),
  name:           yup.string().required('El nombre es requerido'),
  phoneNumber:    yup.string().required('El número telefónico es requerido')
});

const formValidationWithAddress = formValidation.shape({
  city:    yup.string().required('La ciudad es requerida'),
  address: yup.string().required('La dirección es requerida')
});

const getValidationSchema = (type: ClientFormType): any => {

  switch (type) {

    case 'home_delivery':
      return formValidationWithAddress;

    default:
      return formValidation;

  };

};

const Address: FC = () => {

  const formType = useRef<ClientFormType>('');
  const saveUserData = useRef<boolean>(false);

  const { setClientData } = useContext(CartContext);

  const styledTheme = useTheme();
  const router = useRouter();

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
      title='Datos de envio'
      desc=''
    >
      <S.Container>
        <S.Title>Datos de la orden</S.Title>
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
                label="Efectivo"
                {...commonFormControlLabelProps}
              />
              <S.CustomFormControlLabel
                value="credit_card"
                label="Tarjeta de crédito"
                {...commonFormControlLabelProps}
              />
              <S.CustomFormControlLabel
                value="debit_card"
                label="Tarjeta de débito"
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
                label="Retiro por local"
                {...commonFormControlLabelProps}
              />
              <S.CustomFormControlLabel
                value="home_delivery"
                label="Envió a domicilio"
                {...commonFormControlLabelProps}
              />
            </RadioGroup>
            <S.CustomFormHelperText styledTheme={styledTheme}>
              {errors.deliveryMethod?.message}
            </S.CustomFormHelperText>
          </FormControl>

          <S.Separator />

          <TextInput
            label="Nombre"
            type="text"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />

          <TextInput
            label="Teléfono"
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
                  label="Ciudad"
                  type="text"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  {...register('city')}
                />

                <TextInput
                  label="Dirección"
                  type="text"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  {...register('address')}
                />
              </>
            )
          }

          <S.Separator />

          <FormGroup>
            <S.CustomFormControlLabel
              label="Recordar mis datos para futuros pedidos"
              styledTheme={styledTheme}
              control={<S.CustomCheckbox styledTheme={styledTheme} />}
              // eslint-disable-next-line padded-blocks
              onChange={(_, checked) => { saveUserData.current = checked; }}
            />
          </FormGroup>

          <S.ButtonWrapper>
            <Button
              text="Confirmar datos"
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
