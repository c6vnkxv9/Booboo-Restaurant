/**
 * 促銷橫幅組件
 */
import { alpha } from '@mui/material/styles'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'

export default function PromotionBanner() {
  return (
    <Card
      elevation={2}
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        minHeight: 200,
        borderRadius: 2,
        bgcolor: theme.palette.grey[900],
        color: theme.palette.common.white,
      })}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.30,
          backgroundImage:
            'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBvWcIFX7fTsijP8vJABjxP4toU5fxUS2WSTv01IIAZjnz1ZPGS5bIzjSdfY9xGgQJJTHV0u9hvlFY2HlbcZBqIkMQo3ez7SNl4qBrB53_7Zw8LX19P5xVqnwQVu2o-t33lQY6wfnLXE69aQYCJxjl9g-lklH5FFKIQTzEZ7sfEKTTq7sM97L5PPF410UBC5NH0pLsjQPkhrodQobJWfBKYzOJ3AtyA6mOTu1lE7F7KwQKf-tLYBacwKxi-BugfMApUrJNAl9PNznI)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <CardContent sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ fontSize: 40, mb: 1, lineHeight: 1 }}>🎁</Box>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>
            會員專屬優惠
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.90, mb: 2 }}>
            加入會員即送
            <br />
            季節小菜一份
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={(theme) => ({
              borderRadius: 999,
              fontWeight: 900,
              color: theme.palette.text.primary,
              bgcolor: theme.palette.background.paper,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 0.92),
                boxShadow: 'none',
              },
            })}
          >
            立即註冊
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

