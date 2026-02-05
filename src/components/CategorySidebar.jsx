import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import { Box, List, ListItemButton, ListItemText, Paper, Stack, Typography } from '@mui/material'

/**
 * 通用的分類導航組件
 * @param {string} activeCategory - 當前選中的分類
 * @param {Function} onCategoryChange - 分類變更處理函數
 * @param {Array} categories - 分類清單
 * @param {string} title - 側邊欄標題
 * @param {string} subtitle - 側邊欄副標題
 * @param {React.ReactNode} extra - 額外的內容（如優惠橫幅）
 */
export default function CategorySidebar({ 
  activeCategory = 'all', 
  onCategoryChange, 
  categories = [],
  title = '分類',
  subtitle = '請選擇類別',
  extra
}) {
  return (
    <Stack spacing={2}>
      <Paper
        elevation={1}
        sx={(theme) => ({
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.10)}`,
        })}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, mb: 2 }}>
            {subtitle}
          </Typography>

          <List dense disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {categories.map((category) => {
              const selected = activeCategory === category.id
              return (
                <ListItemButton
                  key={category.id}
                  selected={selected}
                  onClick={() => onCategoryChange(category.id)}
                  sx={(theme) => ({
                    position: 'relative',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    gap: 1.5,
                    alignItems: 'center',
                    transition: theme.transitions.create(['background-color', 'color'], {
                      duration: theme.transitions.duration.shortest,
                    }),
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.light, 0.10),
                      color: theme.palette.primary.main,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 4,
                        borderRadius: 999,
                        backgroundColor: theme.palette.primary.main,
                      },
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.light, 0.14),
                      },
                    },
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    },
                  })}
                >
                  <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                    {category.icon}
                  </Box>
                  <ListItemText
                    primary={category.name}
                    primaryTypographyProps={{
                      fontWeight: selected ? 900 : 600,
                      color: selected ? 'inherit' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              )
            })}
          </List>
        </Box>
      </Paper>

      {extra ? <Box>{extra}</Box> : null}
    </Stack>
  )
}

CategorySidebar.propTypes = {
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  extra: PropTypes.node
}

