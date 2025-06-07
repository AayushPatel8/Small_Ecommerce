import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';

const Logo = () => {
    return (
        <div style={{display:'flex', flexDirection:'coloumn'}}>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
        </div>
    );
}
 
export default Logo;