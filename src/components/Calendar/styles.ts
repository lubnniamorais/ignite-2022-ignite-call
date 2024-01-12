import { Text, styled } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})

// Tag que engloba o nome do mês e as setas de direção
export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

// Tag que apresenta o nome do mês
export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  span: {
    color: '$gray200',
  },
})

// Tag que apresenta as setas de direção
export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },
  },

  '&:hover': {
    color: '$gray100',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})

// Tag que representa os dias da semana
export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',

  // Algoritmo utilizado para calcular o tamanho das colunas.
  // A propriedade 'fixed' determina que todas as células da tabela têm o mesmo tamanho.
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    content: '.',
    lineHeight: '0.75rem',
    display: 'block',
    color: '$gray800',
  },

  'tbody td': {
    boxSizing: 'border-box',
  },
})

// Tag que representa cada dia do mês
export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',

  // Determina com que cada botão tenha a mesma altura e largura
  aspectRatio: '1/1',
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
