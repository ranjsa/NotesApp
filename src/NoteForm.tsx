import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Tag } from './App';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void  
}

export function NoteForm({ onSubmit }: NoteFormProps ) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit (e: FormEvent) {
    e.preventDefault();

    onSubmit({ 
        title: titleRef.current!.value,
        markdown: markDownRef.current!.value,
        tags: [],
    });
     
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <FormGroup controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreateableReactSelect isMulti value={selectedTags.map(tags => {
                    return { label: tags.label, value: tags.id } 
                })}
                
                onChange={(tags) => {
                    setSelectedTags(tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                    }))
                }}

                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control required as="textarea" rows={15} ref={markDownRef} />
          </FormGroup>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </div>
  );
}
