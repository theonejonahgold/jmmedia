import { EditorProps, EditorContainer } from './Editors'
import { InputField, Button } from '../../../../Form'
import { ChangeEvent } from 'react'
import { ArticleText } from '../../../../Portfolio/Article'

interface ParagraphEditorProps extends EditorProps {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const ParagraphEditor: React.FunctionComponent<ParagraphEditorProps> = ({
  editing,
  onCancel,
  onChange,
  onSubmit,
  value,
}) =>
  editing ? (
    <EditorContainer>
      <InputField
        label=""
        type="textarea"
        name="paragraph"
        value={value}
        required
        onChange={onChange}
      />
      <Button
        onClick={e => {
          e.preventDefault()
          onSubmit()
        }}
      >
        Opslaan
      </Button>
      <Button
        onClick={e => {
          e.preventDefault()
          onCancel()
        }}
      >
        Annuleren
      </Button>
    </EditorContainer>
  ) : (
    <ArticleText>{value}</ArticleText>
  )
