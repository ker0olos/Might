import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { createStyle } from 'flcss';

import { ReactSVG } from 'react-svg';

import getTheme, { opacity } from '../colors.js';

const colors = getTheme();

/**
* @param { {
*    defaultIndex: number,
*    options: Array<string>,
*    onChange: (newValue: string) => void
*  } } param0
*/
const Select = ({ defaultIndex, options, onChange }) =>
{
  const [ shown, setShown ] = useState(false);
  const [ value, setValue ] = useState(options[defaultIndex || 0]);

  const show = () =>
  {
    if (shown)
      return;

    setShown(true);
  };

  const change = (opt) =>
  {
    setShown(false);
    setValue(opt);

    if (onChange)
      onChange.call(undefined, opt);
  };

  return <div shown={ shown.toString() } className={ styles.container } onClick={ show }>

    <div className={ styles.label }>{ value }</div>

    <ReactSVG src='icons/down.svg' className={ styles.icon }/>

    <div shown={ shown.toString() } className={ styles.wrapper } onClick={ () => setShown(false) }/>

    <div shown={ shown.toString() } className={ styles.menu }>
      {
        options.map((opt, i) =>
        {
          return <div key={ i } className={ styles.option } onClick={ ()  => change(opt) }>
            { opt }
          </div>;
        })
      }
    </div>

  </div>;
};

Select.propTypes = {
  defaultIndex: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func
};

const styles = createStyle({
  container: {
    display: 'flex',
    cursor: 'pointer',

    position: 'relative',

    color: colors.blackText,
    backgroundColor: colors.whiteBackground,

    userSelect: 'none',

    height: '40px',

    border: 0,
    borderBottom: `${colors.blackText} 1px solid`,

    ':hover': {
      color: colors.whiteText,
      backgroundColor: colors.accent,

      borderBottom: `${colors.accent} 1px solid`,

      ' svg': {
        fill: colors.whiteText
      }
    },

    ' svg': {
      fill: colors.blackText
    },

    '[shown="true"]': {
      color: colors.whiteText,
      backgroundColor: colors.accent,

      borderBottom: `${colors.accent} 1px solid`
    }
  },

  label: {
    flexGrow: 1,
    textTransform: 'capitalize',

    fontSize: '14px',
    margin: 'auto 10px'
  },

  icon: {
    '> div': {
      width: '20px',
      height: '20px'
    },

    '> div > svg': {
      width: '20px',
      height: '20px'
    },

    margin: 'auto 10px'
  },

  wrapper: {
    display: 'none',
    position: 'fixed',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: opacity(colors.blackBackground, 0.25),

    top: 0,
    left: 0,
    
    width: '100vw',
    height: '100vh',

    '[shown="true"]': {
      display: 'flex'
    }
  },

  menu: {
    display: 'none',
    position: 'absolute',
    
    flexDirection: 'column',
    backgroundColor: colors.whiteBackground,

    top: '50px',
    left: '-5px',

    minHeight: '40px',
    width: 'calc(100% + 10px)',
    height: 'fit-content',

    border: `${colors.accent} 1px solid`,
    
    '[shown="true"]': {
      display: 'flex'
    }
  },

  option: {
    color: colors.blackText,
    backgroundColor: colors.whiteBackground,

    textTransform: 'capitalize',

    padding: '15px',

    ':hover': {
      color: colors.whiteText,
      backgroundColor: colors.accent
    }
  }
});

export default Select;