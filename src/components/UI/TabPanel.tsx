import { Box } from '@mui/material'

const TabPanel = ({ children, value, index }: any) => {
  return <div hidden={value !== index}>{value === index && <Box p={2}>{children}</Box>}</div>
}

export default TabPanel
