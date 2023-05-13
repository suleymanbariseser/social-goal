import Box from './box';

interface Props {
  content?: React.ReactNode;
}

export default function Divider({ content }: Props) {
  return (
    <Box
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ flexGrow: 1, height: 1, backgroundColor: 'text.secondary' }} />
      {content && <Box sx={{ paddingHorizontal: 4 }}>{content}</Box>}
      <Box sx={{ flexGrow: 1, height: 1, backgroundColor: 'text.secondary' }} />
    </Box>
  );
}
