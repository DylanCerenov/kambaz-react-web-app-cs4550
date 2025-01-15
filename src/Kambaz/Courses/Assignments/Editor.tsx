export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <h3>Assignment Name</h3>
      </label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" cols={50} rows={10}>
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>

        <p></p>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
            </select>
          </td>
        </tr>

        <p></p>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option selected value="PERCENTAGE">
                Percentage
              </option>
            </select>
          </td>
        </tr>

        <p></p>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option selected value="ONLINE">
                Online
              </option>
            </select>
          </td>
        </tr>

        <p></p>
        {onlineEntryOptions()}
        <p></p>
        {assignTo()}
        <p></p>
        {due()}
        {availableFromAndUntil()}
      </table>
      <hr></hr>

      <div dir="rtl">
        <button id="wd-save-button">Save</button>
        <button id="wd-cancel-button">Cancel</button>
      </div>
    </div>
  );
}

function onlineEntryOptions() {
  return (
    <tr>
      <td></td>
      <td>
        <label>Online Entry Options</label>
        <br />
        <input type="checkbox" name="check-entry" id="wd-text-entry" />
        <label htmlFor="wd-text-entry">Text Entry</label>
        <br />
        <input type="checkbox" name="check-entry" id="wd-website-url" />
        <label htmlFor="wd-website-url">Website URL</label>
        <br />
        <input type="checkbox" name="check-entry" id="wd-media-recordings" />
        <label htmlFor="wd-media-recordings">Media Recordings</label>
        <br />
        <input type="checkbox" name="check-entry" id="wd-student-annotation" />
        <label htmlFor="wd-student-annotation">Student Annotation</label>
        <br />
        <input type="checkbox" name="check-entry" id="wd-file-upload" />
        <label htmlFor="wd-file-upload">File Uploads</label>
      </td>
    </tr>
  );
}

function assignTo() {
  return (
    <tr>
      <td align="right" valign="top">
        <label htmlFor="wd-assign-to">Assign</label>
      </td>
      <td>
        <div>
          <label htmlFor="wd-assign-to">Assign to</label>
        </div>
        <input id="wd-assign-to" value={"Everyone"} />
      </td>
    </tr>
  );
}

function due() {
  return (
    <tr>
      <td></td>
      <td>
        <label htmlFor="wd-due-date">Due</label>
        <div>
          <input type="date" value="2024-05-13" id="wd-due-date" />
        </div>
        <br />
      </td>
    </tr>
  );
}

function availableFromAndUntil() {
  return (
    <tr>
      <td></td>
      <td>
        <table>
          <tr>
            <td>
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="date" value="2024-05-06" id="wd-available-from" />
            </td>
            <td>
              <input type="date" value="2024-05-20" id="wd-available-until" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  );
}
