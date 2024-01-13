import { useUser } from 'reactfire'
import AudioControls from '../../components/AudioControls.tsx'
import Page from '../../layout/Page.tsx'
import Column from '../../layout/Column.tsx'
import { Grid } from '../../layout/Grid.tsx'

interface Props {}

export const Components = ({}: Props): JSX.Element => {
  const { data: user } = useUser()

  // if (!user) return <>must be logged in</>

  return (
    <Page title="Components">
      <Grid>
        <Column title="Example 1" span={1}></Column>
        <Column title="Example 2" span={2}></Column>
        <Column title="Example 3" span={2}></Column>
        <Column title="Example 4" span={1} unstyled></Column>
        <Column title="Audio Controls" unstyled>
          <AudioControls />
        </Column>
        <Column title="Example 5"></Column>
      </Grid>
    </Page>
  )
}
