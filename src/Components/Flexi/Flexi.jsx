import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Grid, Paper, TextField, Button, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles';

import { ITEMS, NAME, LABEL, VALUES, TYPE } from '../Constants';

const Flexi = ({ classes, flexiConfig, onFlexiSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    onFlexiSubmit({ ...formData });
    setFormData({});
  };

  return (
    <Paper className={classes.formWrapper}>
      <Grid
        container
        justify='space-between'
        className={classes.InputWrapper}
        alignItems='center'
      >
        {flexiConfig[ITEMS].map((config, idx) => (
          <Fragment key={`${config[NAME]}${idx}`}>
            {config[TYPE] === 'TextField' && (
              <Grid className={classes.inputField} item xs={12}>
                <TextField
                  error={false}
                  fullWidth
                  name={config[NAME]}
                  placeholder={config[LABEL]}
                  label={config[LABEL]}
                  value={formData[config[NAME]] || ''}
                  helperText=''
                  autoComplete='off'
                  InputProps={{
                    onChange: handleInputChange,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            )}
            {config[TYPE] === 'DropDown' && (
              <Grid className={classes.inputField} item xs={12}>
                <TextField
                  error={false}
                  fullWidth
                  select
                  name={config[NAME]}
                  placeholder={config[LABEL]}
                  label={config[LABEL]}
                  value={formData[config[NAME]] || ''}
                  InputProps={{
                    onChange: handleInputChange,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={`Please select ${config[LABEL]}`}
                >
                  {config[VALUES].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Fragment>
        ))}

        <Grid item xs={12} className={classes.buttonWrapper}>
          <Button
            disabled={Object.entries(formData).length !== 2}
            onClick={handleSubmit}
            variant='outlined'
            color='primary'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

Flexi.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  flexiConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  onFlexiSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(Flexi);
