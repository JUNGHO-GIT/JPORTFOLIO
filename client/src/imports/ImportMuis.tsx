// ImportMui.tsx

// mui-material ------------------------------------------------------------------------------------
import {
  // a
  Alert, AlertTitle, AppBar, Autocomplete, Avatar, AvatarGroup,
  Accordion, AccordionActions, AccordionDetails, AccordionSummary,

  // b
  Backdrop, BottomNavigation, BottomNavigationAction, Button, Badge,

  // c
  Card, Checkbox, Collapse, CssBaseline, Container, createTheme, ThemeProvider,

  // d
  Drawer, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,

  // f
  FormControl, FormControlLabel, FormGroup,

  // g
  Grid, GlobalStyles,

  // h - kS
  InputAdornment, InputBase, InputLabel, IconButton,

  // l
  Link, List, ListItem,

  // m - o
  Menu, MenuItem, MenuList, Modal,

  // p - r
  Pagination, Paper, Popover, Popper,

  // s
  Select, Switch, SpeedDial, SpeedDialAction, SpeedDialIcon, Stepper, Step, StepLabel,
  Snackbar, SnackbarContent, Skeleton,

  // t
  Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TabScrollButton,  Toolbar, Tooltip, Tabs, Tab, tabsClasses,
  TextField, TextareaAutosize as TextArea,

  // u
  useMediaQuery, useTheme,

} from '@mui/material';

// props -------------------------------------------------------------------------------------------
import type {
  CardProps, PaperProps, GridProps
} from '@mui/material';

// popupState --------------------------------------------------------------------------------------
import PopupState, {
  bindTrigger,
  bindMenu,
  bindPopover
} from 'material-ui-popup-state';
import {
  usePopupState
} from 'material-ui-popup-state/hooks';

// -------------------------------------------------------------------------------------------------
export {
  // a
  Alert, AlertTitle, AppBar, Autocomplete, Avatar, AvatarGroup,
  Accordion, AccordionActions, AccordionDetails, AccordionSummary,

  // b
  Backdrop, BottomNavigation, BottomNavigationAction, Button, Badge,

  // c
  Card, Checkbox, Collapse, CssBaseline, Container, createTheme, ThemeProvider,

  // d
  Drawer, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,

  // f
  FormControl, FormControlLabel, FormGroup,

  // g
  Grid, GlobalStyles,

  // h - k
  InputAdornment, InputBase, InputLabel, IconButton,

  // l
  Link, List, ListItem,

  // m - o
  Menu, MenuItem, MenuList, Modal,

  // p - r
  Pagination, Paper, Popover, Popper,

  // s
  Select, Switch, SpeedDial, SpeedDialAction, SpeedDialIcon, Stepper, Step, StepLabel,
  Snackbar, SnackbarContent, Skeleton,

  // t
  Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TabScrollButton, Toolbar, Tooltip, Tabs, Tab, tabsClasses,
  TextField, TextArea,

  // props
  CardProps, PaperProps, GridProps,

  // u
  useMediaQuery, useTheme,

  // popupState
  PopupState, bindTrigger, bindMenu, bindPopover, usePopupState,
};